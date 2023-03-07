const { response } = require('express')


const validarAdminRol = ( req, res = response, next ) => {

    if( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin antes verificar el token'
        })
    }

    const { rol, nombre } = req.usuario

    if ( rol !== 'ADMIN_ROL' ) {
        return res.status(401).json({
            msg: `${ nombre } no tiene permisos de administrador`
        })
    }

    next()
}


const tieneRol = ( ...roles ) => {

    return ( req, res = response, next ) => {
        if( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin antes verificar el token'
            })
        }

        if ( !roles.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de esotos roles ${ roles }`
            })
        }


        next()
    }

}



module.exports = {
    validarAdminRol,
    tieneRol
}