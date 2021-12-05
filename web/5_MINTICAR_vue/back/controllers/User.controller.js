const userModel = require("../models/User.model") // exporta las funcionalidades del modelo.

module.exports = class  userController {

    // obtener todos los users
    static async getAll(req,res) {  // async: si me llaman no me espere . Devuelve una promesa
        try {
            const users = await userModel.find(); // await si me llama debe esperarme ya que se necesita el resultado para las sgts instrucciones.
            res.status(200).json(users);
        } catch(err) {
            res.status(404).json({messaje:err.message});
        }
    }

    // obtener un solo user por code
    static async getById(req,res) {  
        try {
            const _id = req.params.id; // obtiene code de búsqueda de la url 
            const user = await userModel.findOne({ "_id": _id });
            if(user == null) {
                res.status(404).json({message:"No encontrado en la base de datos"}); // 404 es para encontrado
            } else {
                res.status(200).json(user);
            }
            
        } catch(err) {
            res.status(404).json({messaje:err.message});
        }
    }

    // crear un user
    static async create(req,res) {
        try {
            let user = req.body; // de la petición(req) me devuelve el cuerpo
            user = await userModel.create(user);
            user.password = undefined;
            res.status(201).json(user)
        } catch(err) {
            res.status(400).json( {message:err.message})
        }
    }

    // actualizar un user
    static async update(req,res) { 
        try {
            const _id = req.params.id; // obtener url de la url
            const user = req.body;
            await userModel.updateOne( {_id : _id} , user );
            res.status(200).json()
        } catch(err) {
            res.status(400).json( {message:err.message})
        }
    }

    // eliminar un user
    static async delete(req,res) {
        try {
            const _id = req.params.id;
            await userModel.deleteOne( {_id:_id} );
            res.status(200).json()
        } catch(err) {
            res.status(400).json( {message:err.message} )
        }
    }

    static async validateUser(req, res) {
        try {
            const credential = req.body;
            const user = await userModel.findOne({ "username": credential.username });
            if (user == undefined || user == null) {
                res.status(404).json({ "message": "Usuario no existe" });
            } else if (user.password != credential.password) {
                res.status(403).json({ "message": "Usuario / contraseña no valido" });
            } else {
                user.password = undefined;
                res.status(200).json(user);
            }

        } catch (err) {
            res.status(400).json({ "message": err.message })
        }
    }

    

}