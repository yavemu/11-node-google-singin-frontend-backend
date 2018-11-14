const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    // validamos que existan los campos requeridos desde el POST
    if (!body.password || !body.email) {
        return res.status(412).json({
            ok: false,
            err: {
                message: "Parametros incompletos."
            }
        });
    }

    let condicion = { email: body.email };

    Usuario.findOne(condicion, (err, usuarioDB) => {

        // Este error se ejecuta cuando es generado por el servidor (500)
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        // Se valida si el email no existe (!usuarioDB => retornaria null) 
        // o si la contraseña no coincide (Se usa bcrypt.compareSync)
        if (!usuarioDB || !bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o Contraseña son incorrectos."
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED_TOKEN, { expiresIn: process.env.CADUCIDAD_TOKEN });

        return res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    });

});


module.exports = app;