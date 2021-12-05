
 // *******************************************************
//             DATOS DE ENTRADA
 //********************************************************* 

 // ***********  Divisas de entrada en base a dolares. *************
dataMoney = {
    'Elige tu Moneda':'Elige tu Moneda',
    'Dolares':{rate:1 , flag:'flag-icon flag-icon-us'},
    'Pesos Mexicanos':{rate:20.56 , flag:'flag-icon flag-icon-mx'},
    'Pesos Colombianos':{rate:3877.5 , flag:'flag-icon flag-icon-co'},  // 1 dolar -> 3888  pesos colombianos
    'Euros': {rate:0.87 , flag:'flag-icon flag-icon-eu'},
    'Libras Esterlinas':{rate:0.75 , flag:'flag-icon flag-icon-gb'},
}

//página fuente de las banderas: https://flagicons.lipis.dev/

 //1) 
 // Capturar elementos del HTML

const form = document.getElementById('form');   // elemento formuluario
const inputMoney = document.getElementById('inputMoney');  // elemento donde se ingresa cantidad de dinero a convertir
const divOutput = document.getElementById('divOutput');    // contenedor de las salidas de las validaciones o de la conversión

const selectInputMoney = document.getElementById('selectInputMoney');  // elemnento moneda de entrada elegida

const spanInputFlag = document.getElementById('flag-input');  // elemento span para dibujar después la bandera de

const selectOutputMoney = document.getElementById('selectOutputMoney');  //  elemnento moneda de salida elegida


//3)
// Agregar divisas a los select 

// función para agregar opciones a un select dado un objeto y el select.
function addOptionsToSelect(dataObj , selectInput) {
        //3.1) Hallar compuesto por array de las claves del objeto
        const dataArray = Object.keys(dataObj);
        // 3.2)// Fragment para agregar temporalmente durante el ciclo todos las option
        let fragment = new DocumentFragment(); 
         //3.3) recorrer array y agregar a un contenedor imaginario(no existe en HTML)
         dataArray.forEach ( moneyName => {
            const newOption = document.createElement('option'); 
            newOption.setAttribute('value',moneyName); // establece el atributo <option value="nombre moneda"> para los calculos siguuientes.
            newOption.innerText = moneyName; // agregar el nombre del país asociado en el Objeto.
            fragment.appendChild(newOption); // agrega la opción nueva al contenedor temproal fragment.
            }
         )
    //3.4) agregar todos los <option></option> al contenedor real <select></select>
     selectInput.appendChild(fragment);
}
       
// 3.5) agregar opciones a los select desde JavaScript  
addOptionsToSelect(dataMoney , selectInputMoney);
addOptionsToSelect(dataMoney , selectOutputMoney );


 // *******************************************************
//             Escuchador del formulario
 //********************************************************* 

 //4) 
 // Capturar evento
form.addEventListener('submit', (evento) =>{
    evento.preventDefault();  // evita recarga de página al presionar submit.
    divOutput.innerHTML = ''; // en caso de presionar sumbit se limpia para evaluar nuevas entradas.
   
    // se invoca función para validar entradas del formulario.
    validar();
})

// *******************************************************
//            VALIDACION DE DATOS DE ENTRADA
 //********************************************************* 
 // 5) Agregar evento submit al formulario 
function validar(){
    const createNewError = function(message) {
        const newError = document.createElement('li');  // atrapar li del HTML 
        newError.innerText = message;                   // insertar texto en <li>message</li>
        divOutput.appendChild(newError);               // agregar li al contenedor definido divOutput
        divOutput.setAttribute('class','failedResult'); // establece el atributo class en el valor especificado para agregar estilos facilmente.
    }
 
    if( inputMoney.value === '' || inputMoney.value === null){ // campo vacío
       createNewError('Cantidad de dinero requerida');
    }
    if( isNaN(inputMoney.value) ){ // return true si NO puede converir a Number. isNaN('2') -> false ,isNaN(2) -> false 
        createNewError('Debes ingresar un número');
    } 
    if( parseFloat(inputMoney.value) < 0 ){ // del form ingresa un String,toca convertir a Number para hacer comparaciones matemáticas.
        createNewError('Debes ingresar un número positivo');
    }
    if( inputMoney.value.substring(0,1) =='0' ||  inputMoney.value.substring(0,2) =='-0' ){ // si primer número es cero o -cero
        createNewError('No puedes comenzar con cero');
    } 
    if( inputMoney.value.indexOf(' ') >= 0) {  // indexof() returna un número 0 o más si encuentra ' ' en el String, de lo contrario retrna -1
        createNewError('Debes eliminar los espacios');
    }
    if(inputMoney.value.indexOf(',') >= 0){
        createNewError('Debes utilizar . en vez de ,');
    }
     // validar si se escogió una moneda de entrada y de salida.
    if(selectInputMoney.value === 'Elige tu Moneda' || selectOutputMoney.value === 'Elige tu Moneda') {
        createNewError('Selecciona ambas moneda');
    }
    // Finalmente si no se atrapan errores en el formulario se puede comenzar el proceso.            
    if(divOutput.innerHTML == '') { 
        //errorDiv.style.display="none"; 
     
        calculo();
    } 
}


// *******************************************************
//             PROCESO: CALCULO DE DIVISAS 
 //********************************************************* 

// función dibujadora de banderas
const drawFlags = (selectMoneyName ,elementoHTML) => {
    //const flagName = 'flag-icon flag-icon-gr' por ejemplo
    const flagName = dataMoney[selectMoneyName]['flag'];
    //spanInputFlag.setAttribute('class','flag-icon flag-icon-gr');  por ejemplo
    elementoHTML.setAttribute('class',flagName); 
};

function calculo(){
        // se invococa función dibujadora de banderas para la moneda de entrada
        drawFlags(selectInputMoney.value , spanInputFlag);

        // como ingresa un string del form se cambia a flotante.
        const amountMoney = parseFloat(inputMoney.value); 

        const valorMonedaActual = dataMoney[selectInputMoney.value]['rate'];
        const valorMonedaDeseada = dataMoney[selectOutputMoney.value]['rate'];
        // resultado = cantidadIngresada * ( ValorMonedaDeseada/ ValorMonedaActual)
        let moneyConverted = amountMoney * (  valorMonedaDeseada / valorMonedaActual );     
        moneyConverted = moneyConverted.toFixed(2); // sobreviven solo 3 decimales

        // finalmente se muestran los resultados
        showResults(amountMoney , valorMonedaDeseada , valorMonedaActual , moneyConverted);
    }



// *******************************************************
//            RESULTADO
 //********************************************************* 
function showResults(amountMoney , valorMonedaDeseada , valorMonedaActual , moneyConverted) {

        // se dibuja HTML en el div de salida.
        divOutput.innerHTML = `   
        <p>${amountMoney } ${selectInputMoney.value } =  ${amountMoney} x [ ${valorMonedaDeseada} /${valorMonedaActual} ] =  ${moneyConverted} ${selectOutputMoney.value}</p>
        <h2 > $  ${moneyConverted}</h2>
        <span id="spanOutputFlag"></span>
        `; 

        // identificar span donde se dibujará la bandera
        const spanOutputFlag = document.getElementById('spanOutputFlag');
        // invocar función dibujadora de bandera
        drawFlags(selectOutputMoney.value , spanOutputFlag );
        
        // cambiar estilos del contenedor de los elementos de salida.
        divOutput.setAttribute('class','successfulResult'); // establece el atributo class con el valor especificado

}




