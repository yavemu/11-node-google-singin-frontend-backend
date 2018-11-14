const jwt = require('jsonwebtoken');

// =========================
//  Verificar Token
// =========================

let verificarToken = (req, res, next) => {

    // Obtener token enviado en el header de la peticion
    let token = req.get('token');

    // metodo de jwt para verificar que el token sea correcto y este certificado
    jwt.verify(token, process.env.SEED_TOKEN, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Autorizacion Denegada: Token no válido."
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });
}

let verificarAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                message: "Autorizacion Denegada: Role no válido."
            }
        });
    }

}

module.exports = {
    verificarToken,
    verificarAdminRole
}