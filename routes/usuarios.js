const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/vaidacion-campos');
const { RolValidator, EmailExiste, UsuarioExistePorId } = require('../helpers/db-validators');


const { usuatiosGet, usuatiosPut, usuatiosPost, usuatiosDelete, usuatiosPatch } = require('../controllers/usuarios');

const router = Router()


router.get('/', usuatiosGet);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( UsuarioExistePorId ),
    check('rol').custom( RolValidator ),
    validarCampos
], usuatiosPut);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener las de 6 digitos').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( EmailExiste ),
    check('rol').custom( RolValidator ),
    validarCampos
], usuatiosPost);

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( UsuarioExistePorId ),
    validarCampos
], usuatiosDelete);

router.patch('/', usuatiosPatch);

module.exports = router