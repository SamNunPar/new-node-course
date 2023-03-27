
const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos, mostrarImg, actualizarImgCloudinary } = require('../controllers/uploads');

const { validarCampos } = require('../middlewares/vaidacion-campos');


const router = Router()


router.post('/', cargarArchivos)

router.put('/:coleccion/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('coleccion', 'No es una coleccion permitida').isIn(['usuarios', 'productos']),
    validarCampos
], actualizarImgCloudinary)

router.get('/:coleccion/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('coleccion', 'No es una coleccion permitida').isIn(['usuarios', 'productos']),
    validarCampos
], mostrarImg)




module.exports = router