const { Router } = require('express');
const { check } = require("express-validator");
const { crearProducto, obtenerProductoId, obtenerProductos, borrarProducto, reactivarProducto, actualizarProducto } = require('../controllers/productos');
const { ProductoExistePorId, CategoriaExistePorId, productoActivo } = require('../helpers/db-validators');
const { validarJWT, validarCampos, tieneRol } = require('../middlewares');

const router = Router();


// Crear producto - post - token - admin
router.post('/', [
    validarJWT,
    tieneRol('ADMIN_ROL'),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", 'No es in id valido').isMongoId(),
    check("categoria").custom(CategoriaExistePorId),
    validarCampos,
], crearProducto)

// Obtener productos - get - publico
router.get('/', obtenerProductos)

// Obtener un producto - get - publico
router.get('/:id', [
    check("id", "No es un ID valido").isMongoId(),
    check('id').custom(ProductoExistePorId),
    check("id").custom(productoActivo),
    validarCampos,
],obtenerProductoId)

// Actualizar producto - post - token - admin
router.put('/:id', [
    validarJWT,
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(productoActivo),
    check("id").custom( ProductoExistePorId ),
    validarCampos,
],actualizarProducto)

// Borrar producto - delete - token - admin
router.delete('/:id', [
    validarJWT,
    tieneRol("ADMIN_ROL"),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(ProductoExistePorId),
    check("id").custom(productoActivo),
    validarCampos,
],borrarProducto)

// Rectivar producto - post - token - admin
router.post('/:id', [
    validarJWT,
    tieneRol("ADMIN_ROL"),
    check("id").custom(ProductoExistePorId),
    check("id", "No es un ID valido").isMongoId(),
    validarCampos,
],reactivarProducto)


module.exports = router;