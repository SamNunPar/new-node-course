
const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario.js')


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token')

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // Buscar el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );

        if ( !usuario ) {
            return res.status(401).json({
                msg: 'Token no valido - No existe el usuario'
            })
        }

        // Verificar estado del usuario
        if ( !usuario.estado) {
            res.status(401).json({
                msg: 'Token no valido - Usuario con estado false'
            })
        }


        req.usuario = usuario;

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no vaido'
        })
    }

}




module.exports = {
    validarJWT
}

