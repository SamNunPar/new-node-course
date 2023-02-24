const { Router } = require('express');
const { usuatiosGet, usuatiosPut, usuatiosPost, usuatiosDelete, usuatiosPatch } = require('../controllers/usuarios');

const router = Router()


router.get('/', usuatiosGet);

router.put('/:id', usuatiosPut);

router.post('/', usuatiosPost);

router.delete('/', usuatiosDelete);

router.patch('/', usuatiosPatch);

module.exports = router