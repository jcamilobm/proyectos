const faqModel = require("../models/Faq.model") // exporta las funcionalidades del modelo.

module.exports = class  faqController {

    // obtener todos los faq
    static async getAll(req,res) {  // async: si me llaman no me espere . Devuelve una promesa
        try {
            const faq= await faqModel.find(); // await si me llama debe esperarme ya que se necesita el resultado para las sgts instrucciones.
            res.status(200).json(faq);
        } catch(err) {
            res.status(404).json({messaje:err.message});
        }
    }

    // obtener una sola faq por id(dado automáticamente por MongoDB)
    static async getById(req,res) {  
        try {
            const _id = req.params.id; // obtiene code de búsqueda de la url 
            const faq = await faqModel.findOne({ "_id": _id });
            if(faq == null) {
                res.status(404).json({message:"No encontrado en la base de datos"}); // 404 es para encontrado
            } else {
                res.status(200).json(faq);
            }
            
        } catch(err) {
            res.status(404).json({messaje:err.message});
        }
    }

    // crear una faq
    static async create(req,res) {
        try {
            let faq = req.body; // de la petición(req) me devuelve el cuerpo
            faq = await faqModel.create(faq);
            res.status(201).json(faq)
        } catch(err) {
            res.status(400).json( {message:err.message})
        }
    }

    // actualizar un faq
    static async update(req,res) {
        try {
            const _id = req.params.id; // obtener url de la url
            const faq= req.body;
            await faqModel.updateOne( {_id : _id} ,faq );
            res.status(200).json()
        } catch(err) {
            res.status(400).json( {message:err.message})
        }
    }

    // eliminar un faq
    static async delete(req,res) {
        try {
            const _id = req.params.id;
            await faqModel.deleteOne( {_id:_id} );
            res.status(200).json()
        } catch(err) {
            res.status(400).json( {message:err.message} )
        }
    }
}