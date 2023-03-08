const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoriaId, borrarCategoria, actualizarCategoria, reActivarCategoria } = require('../controllers/categorias');
const { CategoriaExistePorId, CategoriaExistePorNombre, categoriaActiva } = require('../helpers/db-validators');
const { validarCampos, validarJWT, tieneRol } = require('../middlewares');

const router = Router()


// Obtener todas las categorias - publico
router.get('/', obtenerCategorias)

// Obtener una categoria - publico
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( CategoriaExistePorId ),
    check('id').custom( categoriaActiva ),
    validarCampos,
], obtenerCategoriaId)

// Crear categoria - cualquiera con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] ,crearCategoria)

// Actualizar una categoria - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('id').custom( categoriaActiva ),
//    check('nombre', 'id').custom( CategoriaExistePorNombre ),
    check('id').custom( CategoriaExistePorId ),
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], actualizarCategoria)

// Borrar una categoria - solo admin
router.delete('/:id', [
    validarJWT,
    tieneRol('ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( CategoriaExistePorId ),
    check('id').custom( categoriaActiva ),
    validarCampos
] ,borrarCategoria)

//
router.post('/:id', [
    validarJWT,
    tieneRol('ADMIN_ROL'),
    check('id').custom( CategoriaExistePorId ),
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
] ,reActivarCategoria)


module.exports = router

