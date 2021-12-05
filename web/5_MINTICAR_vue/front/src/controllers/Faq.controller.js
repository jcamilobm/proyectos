/* aquí van las funciones que deben ejecutarse parse
 conectarse al backend( servidor con puerto elegido) */

import httpClient from "./httpClients"; // importar biblioteca que genera un cliente para conectarse al servidor por el puerto elegido(3000 en este caso)

const END_POINT = "/api/faq";   // ruta de petición al servidor

const getAllFaq = () => httpClient.get(END_POINT); // petición GET al servidor con la ruta elegida.

const createFaq = (faq) => httpClient.post(END_POINT,faq); // petición para agregar una faq

const getFaq  = (id) =>  httpClient.get(END_POINT+"/"+id); // consultar una sola faq

const updateFaq  = (id,faq) => httpClient.put(END_POINT+'/'+id, faq)  //actualizar una faq

const deleteFaq  = (id) => httpClient.delete(END_POINT+"/"+id)  //borrar una faq


export {
    getAllFaq,
    createFaq,
    getFaq ,
    updateFaq,
    deleteFaq
}
