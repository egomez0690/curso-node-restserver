const {response, request} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');


const usuariosGet = async (req = request, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado:true};

    /*const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite));

    const total = await Usuario.countDocuments(query);*/
    
    //Esto hace que se ejecuten demanera concurrente, hilos distintos, 
    //pero espera a que terminen las dos para devolver (await)
    //Si una da error, todas dan error
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios       
    });
};

const usuariosPost = async (req = request, res = response) => {
    
    

    const {nombre, correo, password, rol} = req.body;

    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });
    
    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //Guardar en BD            
    await usuario.save();

    res.json(usuario);
};

const usuariosPut = async (req, res = response) => {

    const {id} = req.params;

    const {_id, password, google, correo, ...resto} = req.body;

    //TODO validar contra BD
    if (password){
        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
};

const usuariosDelete = async (req, res = response) => {

    const {id} = req.params;

    //Borrado Fisico    
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json(usuario);
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
};