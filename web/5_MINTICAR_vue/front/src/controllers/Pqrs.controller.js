/* aquí van las funciones que deben ejecutarse parse
 conectarse al backend( servidor con puerto elegido) */

import httpClient from "./httpClients"; // importar biblioteca que genera un cliente para conectarse al servidor por el puerto elegido(3000 en este caso)

const END_POINT = "/api/pqrs";   // ruta de petición al servidor

const getAllPqrs = () => httpClient.get(END_POINT); // petición GET al servidor con la ruta elegida.

const createPqrs = (pqrs) => httpClient.post(END_POINT,pqrs); // petición para agregar una pqrs

const getPqrs = (id) =>  httpClient.get(END_POINT+"/"+id); // consultar una sola pqrs

const updatePqrs = (id,pqrs) => httpClient.put(END_POINT+'/'+id, pqrs)  //actualizar una pqrs

const deletePqrs = (id) => httpClient.delete(END_POINT+"/"+id)  //borrar una pqrs


export {
    getAllPqrs,
    createPqrs,
    getPqrs,
    updatePqrs,
    deletePqrs
}
