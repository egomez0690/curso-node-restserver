const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUserById } = require('../helpers/db-validators');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/',  usuariosGet);

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUserById),
    check('rol').custom(esRoleValido),
    validarCampos
],
usuariosPut);

router.post('/', [
    check ('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check ('password', 'El password debe ser más de 6 letras ').isLength({min: 6}),
    check ('correo', 'El correo no tiene el formato correcto').isEmail(),
    check ('correo').custom(emailExiste),
    //check ('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check ('rol').custom(esRoleValido),
    validarCampos       
] ,usuariosPost);

router.delete('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUserById),
    validarCampos
]
,  usuariosDelete);

module.exports = router;