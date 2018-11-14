const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const dataRoles = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: 'El rol {VALUE} no es permitido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es un campo requerido.']
    },
    email: {
        type: String,
        unique: [true, 'Ya existe un registro con este email'],
        required: [true, 'El email es un campo requerido.']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es un campo requerido.']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: dataRoles,
    },
    estado: {
        type: Boolean,
        required: true,
        default: true,
    },
    google: {
        type: Boolean,
        required: false,
    }
});

usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObj = user.toObject();
    delete userObj.password;

    return userObj;

}

usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} {VALUE} ya existe.' })

module.exports = mongoose.model('Usuario', usuarioSchema);