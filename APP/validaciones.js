const validator = require('validator');
const databd = require('./operaciones');
const validaciones = {};

validaciones.colab = function(colab){
    try{
        if(validator.isEmpty(colab.body.colaborador)){
            return({codigo: 1, descripcion: 'Campo colaborador vacio'});
        }
        return{codigo: 0};
    }
catch{
    return({codigo: 2, descripcion: 'Body invalido'});
}
}

module.exports = validaciones