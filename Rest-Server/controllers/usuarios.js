const { response } = require('express')
const bcryptjs = require('bcryptjs')


const Usuario = require('../models/usuario.js')


const usuatiosGet = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number( desde ))
            .limit(Number( limite ) )
    ]);

    res.json({
        total,
        usuarios
    })
}

const usuatiosPost = async(req, res = response) => {
    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })
    

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync( password, salt )

    await usuario.save()

    res.json({
        usuario
    })
}

const usuatiosPut = async(req, res = response) => {

    const { id } = req.params
    const { _id, password, google, ...resto } = req.body

    // Validar TODO contra DB
    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync( password, salt )
    }

    const usuariodb = await Usuario.findByIdAndUpdate( id, resto )


    res.json(usuariodb)
}

const usuatiosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controller'
    })
}

const usuatiosDelete = async (req, res = response) => {

    const { id } = req.params


    const usuario = await Usuario.findByIdAndUpdate( id, {estado:false} );

    res.json(usuario)
}



module.exports = {
    usuatiosGet,
    usuatiosPost,
    usuatiosPut,
    usuatiosPatch,
    usuatiosDelete
}