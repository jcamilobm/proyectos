// Este modelo es dinámico dependiendo de los campos en la abse de datos en esta colección.

const mongoose = require("mongoose");  // cargar la biblioteca

// Crear esquema de mongo DB para la colección FAQ

const pqrsSchema = mongoose.Schema({
    
    pregunta:{type:String},
    respuesta:{type:String},
    fecha:  { type: Date, default: Date.now },

});

module.exports = mongoose.model("Faq",pqrsSchema);