//   FORMULARIO DE REGISTRO

// DATOS HTML DE ENTRADA
const form = document.getElementById('form');           // formulario de registro
const divOutput = document.getElementById('divOutput');    // contenedor de las salidas de las validaciones o de la conversión


// Escuchador 
form.addEventListener('submit', e => {
    e.preventDefault();  // evita que se refresque la página al envíar un formulario.
    
    // capturar datos del formulario
    const dataForm = catchData();

    //validar datos
    if( validationForm( dataForm ) ){
        // si son validos guardar en localStorage
        saveLocalStorage( dataForm ,'registers');
    }
   
})


// Función para capturar datos
function catchData() {
    // sin datos de entrada
    // salida: objeto con los valores ingresados por el usuario en el formulario.
    const name = document.getElementById('inputName').value ;
    const lastName = document.getElementById('inputLastname').value ;
    const phone= document.getElementById('inputPhone').value ;
    const address = document.getElementById('inputAddress').value ;
    const comments = document.getElementById('inputComments').value ;

    // se encapsulan los datos en un objeto para facilitar el proceso.
    dataForm = {
        name,
        lastName,
        phone,
        address,
        comments
    }

    return dataForm ;
}

// función para validar formulario
function validationForm( dataForm ) {
    // Datos de entrada: objeto con datos del formualrio
    // datos de salida: True o False dependiendo de las validaciones. Además se crean mensajes de salida.

    const { name , lastName, phone, address, comments } = dataForm;

    let isValid = true;  // se asume que el formulario tiene datos validos

    divOutput.innerHTML = '' ; // limpiar para mostrar emnsajes del neuvo envío.

    const createNewMessage = function(message) {
        const newMessage = document.createElement('li');  // atrapar li del HTML 
        newMessage.innerText = message;                   // insertar texto en <li>message</li>
        divOutput.appendChild(newMessage);               // agregar li al contenedor definido divOutput
    }
    
    // posibles errores
    if(name.length >=10 ) {
        createNewMessage('El nombre debe ser menor a 11 caracteres') ;
        isValid = false;
    }
    if(lastName.length >=14 ) {
        createNewMessage('El apellido debe ser menor a 15 caracteres') ;
        isValid = false;
    }
    if( isNaN( phone) ) {  // isNaN devuelve true si No es un número.  isNaN('ss') -> true , isNaN('22') -> false
        createNewMessage('El teléfono debe ser un número')
        isValid = false;
    }
    if(address.length>=15){
        createNewMessage('La dirección debe ser menor a 16 caracteres')
        isValid = false;
    }
    if(comments.length>=51){
        createNewMessage('Las observaciones deben ser menor a 50 caracteres')
        isValid = false;
    }
   
    // si es valido se crea mensaje verde
    if( isValid ) {
        createNewMessage('envío exitoso');
        // establece el atributo class en el valor especificado para agregar estilos facilmente. 
        divOutput.setAttribute('class','successfulResult')
        setTimeout( ()=> setTimeout("location.reload(true)" ,  2000 ) ) // recargar la pa´gina después de 2segundos
       
    } else { // de lo contrario se crea uno rojo
        divOutput.setAttribute('class','failedResult'); // establece el atributo class en el valor especificado para agregar estilos facilmente.
    }

    // devuelve resultado booleano para activar/desactivar proceso.
    return  isValid;
}


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
  
}

