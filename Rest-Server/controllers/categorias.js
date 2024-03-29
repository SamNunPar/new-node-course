const { response } = require('express')
const Categoria = require('../models/categoria')


// Obtener Categorias - paginado - total - populate
const obtenerCategorias = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ))
            .limit( Number( limite ) )
    ]);

    res.json({
        total,
        categorias
    })
}

// Obtener categoria - populate
const obtenerCategoriaId = async(req, res = response) => {

    const { id } = req.params

    const categoria = await Categoria.findById( id ).populate('usuario', 'nombre')

    res.json({
        categoria
    })
}

// Crear categoria
const crearCategoria = async( req, res = response ) => {

    const nombre = req.body.nombre.toUpperCase()

    const categoriaDB = await Categoria.findOne({nombre})

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        })
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data )

    await categoria.save()

    res.status(201).json(categoria)

}

// actualizar categoria
const actualizarCategoria = async( req, res = response ) => {
    
    const { id } = req.params
    const { estado, usuario, ...data } = req.body
    
    const nombre = data.nombre.toUpperCase()
    
    const categoriaDB = await Categoria.findOne({nombre})

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        })
    }

    data.nombre = data.nombre.toUpperCase()
    data.usuaro = req.usuario._id

    const categoria = await Categoria.findByIdAndUpdate( id, data, { new:true } )

    res.json( categoria )

/*     const name = req.body.nombre.toUpperCase()
    const { id } = req.params

    const categoria = await Categoria.findOneAndUpdate( id, {nombre: name} )

    res.json( categoria ) */

}

// borrar categoria - estado: false
const borrarCategoria = async (req, res = response) => {

    const { id } = req.params


    const categoria = await Categoria.findByIdAndUpdate( id, {estado:false}, {new:true} );

    res.json( categoria )
}

// borrar categoria - estado: false
const reActivarCategoria = async (req, res = response) => {

    const { id } = req.params


    const categoria = await Categoria.findByIdAndUpdate( id, {estado:true} );

    res.json( categoria )
}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaId,
    borrarCategoria,
    actualizarCategoria,
    reActivarCategoria
}