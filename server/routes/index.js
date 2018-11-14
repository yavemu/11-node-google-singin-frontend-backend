const express = require('express');

const app = express();

// instanciando los diferentes archivos de rutas
app.use(require('./usuario'));
app.use(require('./login'));

module.exports = app;