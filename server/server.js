require('./config/config');

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// optimizando la declaracion de las rutas, haciendo referencia solo a una ruta "global"
app.use(require('./routes/index'));

// parse application/json
app.use(bodyParser.json())

// habilitar la carpeta public como publica
app.use(express.static(path.resolve(__dirname,'../public')));

mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err

    console.log('Base de datos: ONLINE');

});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});