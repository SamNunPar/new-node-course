const { response } = require('express')


const usuatiosGet = (req, res = response) => {
    res.json({
        msg: 'get API - Controller'
    })
}

const usuatiosPost = (req, res = response) => {

    const body = req.body

    res.json({
        msg: 'post API - Controller',
        body
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