
const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos, actualizarImg } = require('../controllers/uploads');
const { coleccionesValidas, UsuarioExistePorId } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/vaidacion-campos');


const router = Router()


router.post('/', cargarArchivos)

router.put('/:coleccion/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('coleccion', 'no es una coleccion permitida').isIn(['usuarios', 'productos']),
    validarCampos
], actualizarImg)



module.exports = router