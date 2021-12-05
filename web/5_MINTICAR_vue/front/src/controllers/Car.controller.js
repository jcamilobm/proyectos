/* aquí van las funciones que deben ejecutarse parse
 conectarse al backend( servidor con puerto elegido) */

import httpClient from "./httpClients"; // importar biblioteca que genera un cliente para conectarse al servidor por el puerto elegido(3000 en este caso)

const END_POINT = "/api/cars";   // ruta de petición al servidor

const getAllCars = () => httpClient.get(END_POINT); // petición GET al servidor con la ruta elegida.

const createCar = (car) => httpClient.post(END_POINT,car); // petición para agregar un carro al catálogo, el segundo parámetro va al body.

const getCar = (id) =>  httpClient.get(END_POINT+"/"+id); // consultar un solo carro.

const updateCar = (id,car) => httpClient.put(END_POINT+'/'+id, car)  //actualizar carro

const deleteCar = (id) => httpClient.delete(END_POINT+"/"+id)  //borrar carro



export {
    getAllCars,
    createCar,
    getCar,
    updateCar,
    deleteCar
}
