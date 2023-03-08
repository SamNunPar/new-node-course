const { response } = require('express')
const Producto = require('../models/producto')


// Obtener productos - get
const crearProducto = async( req, res = response ) => {

    const nombre = req.body.nombre.toUpperCase()
    const { precio, descripcion } = req.body

    const productoDB = await Producto.findOne({nombre})

    if ( productoDB ) {
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe`
        })
    }

    const data = {
        nombre,
        precio,
        descripcion,
        usuario: req.usuario._id,
        categoria: req.categoria._id
    }

    const producto = new Producto( data )

    await producto.save()

    res.status(201).json(producto)

}

// Obtener producto - get

// Crear producto - post

// Actualizar producto - post

// Borrar producto - delete

// Reactivar producto

// Exportar
module.exports = {
    crearProducto,
    
}