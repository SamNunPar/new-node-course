const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria } = require('../controllers/categorias');
const { validarCampos, validarJWT } = require('../middlewares');

const router = Router()

// Obtener todas las categorias - publico
router.get('/', (req, res) => {
    res.json('get categorias')
})

// Obtener una categoria - publico
router.get('/:id', (req, res) => {
    res.json('get una categoria')
})

// Crear categoria - cualquiera con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] ,crearCategoria)

// Actualizar una categoria - cualquiera con token valido
router.put('/:id', (req, res) => {
    res.json('put')
})

// Borrar una categoria - solo admin
router.delete('/:id', (req, res) => {
    res.json('delete')
})



module.exports = router

