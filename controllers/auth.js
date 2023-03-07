const { response } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const { generarJWT } = require('../helpers/generar-jwt')


const login = async(req, res = response) => {

    const { correo, password } = req.body

    try{

        // Verifica existencia de email
        const usuario = await Usuario.findOne({ correo })
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }


        // Verifica si el usuario esta activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }


        // Verificae contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password )
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }


        // Generar JWT (JSON Web Token)
        const token= await generarJWT( usuario.id )


        res.json({
            usuario,
            token
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    login
}

