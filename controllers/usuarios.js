const { response } = require('express')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')


const Usuario = require('../models/usuario.js')


const usuatiosGet = (req, res = response) => {
    res.json({
        msg: 'get API - Controller'
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

const usuatiosPut = (req, res = response) => {

    const id = req.params.id

    res.json({
        msg: 'put API - Controller',
        id
    })
}

const usuatiosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controller'
    })
}

const usuatiosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controller'
    })
}



module.exports = {
    usuatiosGet,
    usuatiosPost,
    usuatiosPut,
    usuatiosPatch,
    usuatiosDelete
}