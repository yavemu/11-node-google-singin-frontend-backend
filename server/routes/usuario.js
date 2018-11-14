const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const { verificarToken, verificarAdminRole } = require('../middlewares/autenticacion');

const app = express();

app.get('/usuario', verificarToken, (req, res) => {

    let desde = req.query.desde || 0;
    let limite = req.query.limite || 5;
    let condicion = { estado: true };

    desde = Number(desde);
    limite = Number(limite);

    Usuario.find(condicion, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {

                return res.status(400).json({
                    ok: false,
                    err
                });

            } else {

                Usuario.count(condicion, (err, total) => {
                    res.json({
                        ok: true,
                        usuarios,
                        total
                    });
                })
            }

        });

});

app.post('/usuario', [verificarToken, verificarAdminRole], (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }
    });

});

app.put('/usuario/:id', [verificarToken, verificarAdminRole], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                usuario: usuarioDB,
            });
        }
    })

});

app.delete('/usuario/:id', [verificarToken, verificarAdminRole], (req, res) => {
    let id = req.params.id;
    let data = {
        estado: false,
    };

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, data, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                usuarioBorrado
            });
        }


    });
});

module.exports = app;