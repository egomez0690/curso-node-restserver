const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol){
        throw new Error('El Rol ingresado no existe en el sistema');
    }
};

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error('El correo ya existe en el sistema');
    }
};

const existeUserById = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error('El id no existe en el sistema');
    }
};


module.exports = {
    esRoleValido,
    emailExiste,
    existeUserById
}