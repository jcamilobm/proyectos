const carModel = require("../models/Car.model") // exporta las funcionalidades del modelo.

module.exports = class  carController {

    // obtener todos los carros
    static async getAll(req,res) {  // async: si me llaman no me espere . Devuelve una promesa
        try {
            const cars = await carModel.find(); // await si me llama debe esperarme ya que se necesita el resultado para las sgts instrucciones.
            res.status(200).json(cars);
        } catch(err) {
            res.status(404).json({messaje:err.message});
        }
    }

    // obtener un solo carro por code
    static async getById(req,res) {  
        try {
            const _id = req.params.id; // obtiene code de búsqueda de la url 
            const car = await carModel.findOne({ "_id": _id });
            if(car == null) {
                res.status(404).json({message:"No encontrado en la base de datos"}); // 404 es para encontrado
            } else {
                res.status(200).json(car);
            }
            
        } catch(err) {
            res.status(404).json({messaje:err.message});
        }
    }

    // crear un carro
    static async create(req,res) {
        try {
            let car = req.body; // de la petición(req) me devuelve el cuerpo
            car = await carModel.create(car);
            res.status(201).json(car)
        } catch(err) {
            res.status(400).json( {message:err.message})
        }
    }

    // actualizar un carro
    static async update(req,res) {
        try {
            const _id = req.params.id; // obtener url de la url
            const car = req.body;
            await carModel.updateOne( {_id : _id} , car );
            res.status(200).json()
        } catch(err) {
            res.status(400).json( {message:err.message})
        }
    }

    // eliminar un carro
    static async delete(req,res) {
        try {
            const _id = req.params.id;
            await carModel.deleteOne( {_id:_id} );
            res.status(200).json()
        } catch(err) {
            res.status(400).json( {message:err.message} )
        }
    }
}