

const validarCampos= require('./vaidacion-campos');
const validarJWT = require('./validar-jwt');
const validarRol = require('./validar-roles');


module.exports = {
    ...validarRol,
    ...validarJWT,
    ...validarCampos,
}