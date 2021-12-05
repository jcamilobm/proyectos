/* aquí van las funciones que deben ejecutarse parse
 conectarse al backend( servidor con puerto elegido) */

import httpClient from "./httpClients"; // importar biblioteca que genera un cliente para conectarse al servidor por el puerto elegido(3000 en este caso)

const END_POINT = "/api/users";   // ruta de petición al servidor

const getAllUsers = () => httpClient.get(END_POINT); // petición GET al servidor con la ruta elegida.

const createUser = (user) => httpClient.post(END_POINT,user); // petición para agregar un carro a  la tabla de usuarios, el segundo parámetro va al body.

const getUser = (id) =>  httpClient.get(END_POINT+"/"+id); // consultar un solo user.

const updateUser = (id,user) => httpClient.put(END_POINT+'/'+id, user)  //actualizar user

const deleteUser = (id) => httpClient.delete(END_POINT+"/"+id)  //borrar user


export {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser ,

}
