
// se importan modulos de js
import { saveLocalStorage } from './localStorage.js';


// 1) ESCUCHADOR
form.addEventListener('submit', e => {
    e.preventDefault();  // evita que se refresque la página al envíar un formulario.

     //Validaciones datos de entrada
    // se hacen directamente en el HTML con required, min y máx.

    // Capturar datos del formulario
    const person = catchData() ;

    // Calcular IMC
    const IMC = calculteIMC(person) ;
    // Hallar rango de peso ideal
    const [w1 , w2 ] = calculateRangeIdealWeight( person ) ;
    // Dibujar resultados
    setResults(IMC , w1 , w2 ) ;

    //----
    const state = findStateWeight(IMC);

    // GUARDAR EN LOCAL STORAGE
    saveLocalStorage ( {...person , IMC , state } ,'users');

}) 

function catchData() {
    const genre = document.querySelector('input[name="gender"]:checked').value ; 
    const age = document.getElementById('inputAge').value;
    const weight = document.getElementById('inputWeight').value ;
    const height = document.getElementById('inputHeight').value ;

    const objetDataForm = {
        genre ,
        age ,
        weight ,
        height
    }

    return  objetDataForm ;
}

// -----------Calculos --------------------------

function calculteIMC( person ) {
    // datos de entrada: datos de la persona
    // Fórmula: peso (kg) / [estatura (m)]2
    // salida: IMC
    return ( person.weight / person.height ** 2).toFixed(2) 
}

function calculateRangeIdealWeight( person ) {
    // dato de salida: Array con rango de peso ideal
    // Conociendo que IMC saludable está entre 18.5 y 24.9  :
    // weightIdeal = x * h **2
    const weightIdealStart = ( 18.5 * person.height **2 ).toFixed(2);
    const weightIdealEnd = ( 24.9 * person.height **2 ).toFixed(2);
    return [weightIdealStart , weightIdealEnd]
}


function setResults(IMC , weightIdealStart, weightIdealEnd) {
    // IMC: indice de masa corporal
    // range: rango de peso ideal
    const IMCOutput = document.getElementById('IMCOutput');
    const IdealWeightOutput = document.getElementById('IdealWeightOutput');

    // Dibujar DOM
    IMCOutput.innerText = `${IMC}`;
    IdealWeightOutput.innerText = `${weightIdealStart} - ${weightIdealEnd}`;

    // Mover flecha del rango difuminado.
    moveArrow(IMC);

}

function findStateWeight(IMC) {
    let state = ''
    if( IMC < 18.5 ){
        state= 'debajo';
    }else if( IMC <= 24.9 ) {
        state= 'saludable';
    }else if( IMC <= 29.9 ) {
        state = 'sobrepeso'
    }else if( IMC <= 40 ) {
        state ='obeso'
    } else{
        state = "riesgo"
    }

    return state
}

function moveArrow(IMC) {
    // el rango de colores es de 5 colores:
    // IMC <18.5 equivale a 0-19% en la barra :  Por debajo del peso ideal
    // 18.5=<IMC<=24.9  equivale a 20-40% en la barra -> Saludable
    // 25.0=<IMC<=29.9  equivale a 41-60% en la barra -> sobrepeso
    // 30.0=<IMC<=40   equivale a 61-80% en la barra -> obeso
    // IMC>40          equivale a 81-100% en la barra -> alto riesgo

    // agrego status para regsitrar después en el local localStorage el estado del IMC 
    if( IMC < 18.5 ){
        arrow.style.left = `${5}%` ;
    }else if( IMC <= 24.9 ) {
        arrow.style.left = `${28}%` ; 
    }else if( IMC <= 29.9 ) {
        arrow.style.left = `${45}%` ; 
    }else if( IMC <= 40 ) {
        arrow.style.left = `${65}%` ; 
    } else{
        arrow.style.left = `${85}%` ; 
    }
}

