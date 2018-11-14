// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Login: Fencha de vencimiento
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
// ============================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ============================
//  Login: SEED de autenticación
// ============================
process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'este-es-el-codigo-secret-de-mi-app-en-desarrollo';

// ============================
//  Identificar Entorno
// ============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  Base de datos
// ============================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;