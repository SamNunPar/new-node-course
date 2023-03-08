const { Router } = require('express');
const { check } = require("express-validator");
const { crearProducto } = require('../controllers/productos');
const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();


// Crear producto - post - token - admin
router.post('/', [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
], crearProducto)

// Obtener productos - get - publico
router.get('/', (req, res) => {
    res.json('obtener')
})

// Obtener un producto - get - publico
router.get('/:id', (req, res) => {
    res.json('obtener uno')
})

// Actualizar producto - post - token - admin
router.put('/:id', (req, res) => {
    res.json('actualizar')
})

// Borrar producto - delete - token - admin
router.delete('/:id', (req, res) => {
    res.json('borrar')
})

// Rectivar producto - post - token - admin
router.post('/:id', (req, res) => {
    res.json('reactivar')
})


module.exports = router;