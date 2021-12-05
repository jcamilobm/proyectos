// Este modelo es dinámico dependiendo de los campos en la abse de datos en esta colección.

const mongoose = require("mongoose");  // cargar la biblioteca

// crear esquema de mongo DB para la colección usarios

const userSchema = mongoose.Schema({
    
    username:{type:String, unique:true},
    password: {type:String, unique:true},  
    userType: {type:String , enum:['admin','client']},
    email :  {type:String, unique:true,trim:true,lowercase:true},
    cellphone:  {type:String, unique:true , "maxLength":10},
    name: {type:String},
    lastname: {type:String},
    documento:{type:String,unique:true},
    tipoDocumento:{type:String},
    registrationDate:  { type: Date, default: Date.now },
    

  
    // si tuviese un campo compuesto : 
    // size : {
    //     altura:Number ,
    //     weight:Number 
    // }

});

module.exports = mongoose.model("User", userSchema);