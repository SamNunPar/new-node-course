const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivos");
const {Usuario, Producto} = require('../models')


const cargarArchivos = async( req, res = response ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).josn({msg: 'Ningun archivo fue cargado'});
        return;
    }

    try {

        const nombre = await subirArchivo( req.files, undefined, 'imgs' )
        res.json({ nombre })
        
    } catch (msg) {
        res.status(400).json({msg})
    }
}

const actualizarImg = async( req, res = response) => {

    const { id, coleccion } = req.params

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                })
            }
            
            break;
        case 'productos':
            modelo = await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                })
            }
        
        break;
    
        default:
            return res.status(500).json({msg: 'Se me olvido validar eso'})
    }




    res.json({ id, coleccion })

}


module.exports = {
    cargarArchivos,
    actualizarImg
}