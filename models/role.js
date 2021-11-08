//En mongo los datos se guardan en objetos

const {Schema, model} = require('mongoose');

const RoleSchema = Schema({

    rol:{
        type: String,
        required: [true, 'El rol es requerido']
    }
});



module.exports = model( 'Role',  RoleSchema);