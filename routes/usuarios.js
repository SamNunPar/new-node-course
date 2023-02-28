const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validacion-campos');
const { RolValidator, EmailExiste } = require('../helpers/db-validators');


const { usuatiosGet, usuatiosPut, usuatiosPost, usuatiosDelete, usuatiosPatch } = require('../controllers/usuarios');

const router = Router()


router.get('/', usuatiosGet);

router.put('/:id', usuatiosPut);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener las de 6 digitos').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( EmailExiste ),
    check('rol').custom( RolValidator ),
    //check('rol', 'No es un rol valido').isIn([ 'ADMIN_ROLE', 'USER_ROLE' ]),
    validarCampos
], usuatiosPost);

router.delete('/', usuatiosDelete);

router.patch('/', usuatiosPatch);

module.exports = router