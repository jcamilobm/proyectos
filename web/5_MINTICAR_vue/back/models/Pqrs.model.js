// Este modelo es dinámico dependiendo de los campos en la abse de datos en esta colección.

const mongoose = require("mongoose");  // cargar la biblioteca

// crear esquema de mongo DB para la colección usarios

const pqrsSchema = mongoose.Schema({
    
    tipo:{type:String},
    motivo:{type:String},
    email:{type:String},
    descripcion:{type:String},
    estado:{type:String , default:'NL' , enum:['NL','L']},
    fecha:  { type: Date, default: Date.now },

});

module.exports = mongoose.model("Pqrs",pqrsSchema);