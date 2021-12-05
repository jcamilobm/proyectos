// Aquí se configura el cliente http

import axios from "axios"; //  axios permite hacer solicitudes a un servidor remoto.

const httpClient = axios.create({
    // baseURL: "http://localhost:3000", // url base del  servidor al que va a conectarse
    timeout: 3000,                   // cuántos ms debe esperar una respuesta del servidor, si se supera el cliente devuelve un error.
    headers: {                       // tipo de contenido a enviar/ recibir
        "Content-Type": "application/json"
    }
});

// exportar cliente(js nuevo)
export default httpClient; 

// si se quieren exportar más variables

// export {
//     httpClient,
//     var2,
// }