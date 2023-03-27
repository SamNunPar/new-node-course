const path = require('path')
const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL )

const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivos");

const {Usuario, Producto} = require('../models')


const cargarArchivos = async( req, res = response ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).josn({msg: 'Ningun archivo fue cargado'});
    }

    try {

        const nombre = await subirArchivo( req.files, undefined, 'imgs' )
        res.json({ nombre })
        
    } catch (msg) {
        res.status(400).json({msg})
    }
}

const actualizarImgCloudinary = async( req, res = response) => {

    const { id, coleccion } = req.params

    let modelo;

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg: 'Ningun archivo fue cargado'});
    }

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

    // Limpiar imagen previa
    if ( modelo.img ) {
        // Conseguir el ID de la imagen
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1]
        const [ public_id ] = nombre.split('.')

        // Borrar la imagen usando el ID
        cloudinary.uploader.destroy( public_id )
    }

    const { tempFilePath } = req.files.archivo

    const { secure_url } = await cloudinary.uploader.upload( tempFilePath )
    modelo.img = secure_url

    await modelo.save()


    res.json( modelo )
}

const mostrarImg = async(req, res = response) => {

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

    // Limpiar imagen previa
    if ( modelo.img ) {
        const pathImg = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if ( fs.existsSync( pathImg ) ) {
            return res.sendFile( pathImg )
        }
    }

    const placeHolder = path.join( __dirname, '../assets/no-image.jpg' )
    return res.sendFile( placeHolder )
}


module.exports = {
    actualizarImgCloudinary,
    cargarArchivos,
    mostrarImg,
}