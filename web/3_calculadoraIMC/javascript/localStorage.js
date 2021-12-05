// GUARDAR EN LOCAL STORAGE UN GRUPO DE OBJETOS

// Función para guardar objeto en local storage
function saveLocalStorage( dataObjet , keyData ){  // dataObjet

    // datos de entrada:  objeto {name:'jorge' ,apellido:'gonzales',...}  y el nombre deseado para la clave en el localStorage.
    // datos de salida : objetos en una lista gaurdados en el localStorage asigandos a la KeyData dada.

    // futuro array contenedor de objetos.
    let objectList;
    
    // se crea un array para el registro inicial
    if ( localStorage.getItem(keyData) === null ) {
        objectList = [] ; // para el primer registor aún no se tiene array,se inicializa esta vez solamente. 
    
    // para los sgts registros se pasa el 'string array' a un array de javascript para poder manipularlo.
    } else {
        objectList = JSON.parse( localStorage.getItem(keyData) ) ;
    }   

    // se agrega al objeto registro una id en caso de necesitar rastrearlo después.
    dataObjet['id']  =  objectList.length ;
    // el nuevo registro se agrega de último al array
    objectList.push(dataObjet);
     // guardar array en localSrorage. Se debe convertir a un string.
    localStorage.setItem(keyData, JSON.stringify(objectList) )
  
} ;



// exportar función para utilizar en otro módulo js

export { saveLocalStorage } ;