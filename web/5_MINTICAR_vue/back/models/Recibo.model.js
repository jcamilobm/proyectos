// Este modelo es dinámico dpendiendo de los campos en la abse de datos en esta colección.

const mongoose = require("mongoose");  // cargar la biblioteca

// crear esquema de mongo DB para la colección Cars

const reciboSchema = mongoose.Schema({
    
    nameCliente: {type:String},
    lastNameCliente: {type:String},
    documento:{type:String},
    lugarRecogida:{type:String},
    fechaRecogida:{type:String},
    lugarDevolucion:{type:String},
    fechaEntrega:{type:String},
    diasAlquiler:{type:String},    
    modeloCarro:{type:String},
    totalPagar:{type:Number},
    estado:{ type:String,default:'pendiente',enum:['pendiente','cobrado'] },
    reciboDate:  { type: Date, default: Date.now },
    

    // si tuviese un campo compuesto : 
    // size : {
    //     altura:Number ,
    //     weight:Number 
    // }

});

module.exports = mongoose.model("Recibo", reciboSchema);