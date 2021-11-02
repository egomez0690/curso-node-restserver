const {response, request} = require('express')

const usuariosGet = (req = request, res = response) => {
    const {q, nombre = 'no name', apellido} = req.query;
    res.json({
        message:'Get API - From Controller',
        q,
        nombre,apellido
    });
}

const usuariosPost = (req = request, res = response) => {
    
    const {nombre, edad} = req.body;

    res.json({
        message:'Post API - From Controller',
        nombre, edad
    });
}

const usuariosPut = (req, res = response) => {

    const {id} = req.params;

    res.json({
        message:'Put API - From Controller',
        id
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        message:'Delete API - From Controller'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}