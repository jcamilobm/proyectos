/* aquí van las funciones que deben ejecutarse parse
 conectarse al backend( servidor con puerto elegido) */

import httpClient from "./httpClients"; // importar biblioteca que genera un cliente para conectarse al servidor por el puerto elegido(3000 en este caso)

const END_POINT = "/api/recibos";   // ruta de petición al servidor

const getAllRecibos = () => httpClient.get(END_POINT); // petición GET al servidor con la ruta elegida.

const createRecibo = (recibo) => httpClient.post(END_POINT,recibo); // petición para agregar un recibo al catálogo, el segundo parámetro va al body.

const getRecibo = (id) =>  httpClient.get(END_POINT+"/"+id); // consultar un solo recibo

const updateRecibo = (id,recibo) => httpClient.put(END_POINT+'/'+id, recibo)  //actualizar recibo

const deleteRecibo = (id) => httpClient.delete(END_POINT+"/"+id)  //borrar recibo



export {
    getAllRecibos,
    createRecibo,
    getRecibo,
    updateRecibo,
    deleteRecibo
}
