const pqrsModel = require("../models/Pqrs.model") // exporta las funcionalidades del modelo.

module.exports = class  pqrsController {

    // obtener todos los pqrs
    static async getAll(req,res) {  // async: si me llaman no me espere . Devuelve una promesa
        try {
            const pqrs = await pqrsModel.find(); // await si me llama debe esperarme ya que se necesita el resultado para las sgts instrucciones.
            res.status(200).json(pqrs);
        } catch(err) {
            res.status(404).json({messaje:err.message});
        }
    }

    // obtener una sola pqrs por id(dado automáticamente por MongoDB)
    static async getById(req,res) {  
        try {
            const _id = req.params.id; // obtiene code de búsqueda de la url 
            const pqrs = await pqrsModel.findOne({ "_id": _id });
            if(pqrs == null) {
                res.status(404).json({message:"No encontrado en la base de datos"}); // 404 es para encontrado
            } else {
                res.status(200).json(pqrs);
            }
            
        } catch(err) {
            res.status(404).json({messaje:err.message});
        }
    }

    // crear una pqrs
    static async create(req,res) {
        try {
            let pqrs = req.body; // de la petición(req) me devuelve el cuerpo
            pqrs = await pqrsModel.create(pqrs);
            res.status(201).json(pqrs)
        } catch(err) {
            res.status(400).json( {message:err.message})
        }
    }

    // actualizar un pqrs
    static async update(req,res) {
        try {
            const _id = req.params.id; // obtener url de la url
            const pqrs = req.body;
            await pqrsModel.updateOne( {_id : _id} , pqrs );
            res.status(200).json()
        } catch(err) {
            res.status(400).json( {message:err.message})
        }
    }

    // eliminar un pqrs
    static async delete(req,res) {
        try {
            const _id = req.params.id;
            await pqrsModel.deleteOne( {_id:_id} );
            res.status(200).json()
        } catch(err) {
            res.status(400).json( {message:err.message} )
        }
    }
}