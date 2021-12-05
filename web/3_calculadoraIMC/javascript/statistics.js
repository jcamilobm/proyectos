
 // 1 CARGAR ARCHIVO JSON
 import {data} from '../data/data.js';

//*******************SECUENCIA***************************

window.addEventListener("DOMContentLoaded" , () => {

    // 2 ACTUALIZAR
    const dataUpdate = updateData(data) ;
    // 3 calculos estadísticos
    const [ n,numberMen,numberWomen,averageIMCmen,averageIMCwomen,averageIMC ] = calculate(dataUpdate) ;
    // 4. Dibujar tabla con resultados
    drawTableWithAverages(numberMen,averageIMCmen,numberWomen,averageIMCwomen,n,averageIMC) ;
    // 5. Dibujar gráfica de barras
    drawBars(dataUpdate) ;
    // 6. Agregar filas a tabla de usuarios
    addRowsToUserTable(dataUpdate) ;

});


// ************IMPLEMENTACION***************************

// ---------------------------------------------------------------------------------------------------------------
// 1) IMPORTAR ARCHIVO
// ---------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------
// 2 ) ACTUALIZAR ARCHIVO data.json CON LOS DATOS INGRESADOS EN EL FORMULARIO
// ---------------------------------------------------------------------------------------------------------------

// data representa los datos base del archivo json
// pero se maneja un dataUpdate para ir agregando los datos que se envién a través del formulario(están en localStorage).

function updateData(data){
    let dataUpdate;  // dataUpdate = datosBase + datosLocalStorage
    if (localStorage.getItem('users')!==null){  // solo se actualiza si ya hay datos en el local storage
        dataUpdate = [ ...JSON.parse( localStorage.getItem('users'))  , ...data ] ;
    }else{  // de lo contrario solo dibuja los datos base del archivo data.js
        dataUpdate = [...data]; // en vez de dataUpdate = data hace una copia como tal y corta la referencia en memoria,por lo que si por error modifico data, dataupdate no cambia y viceversa.
    };
    return dataUpdate;
} 


// ---------------------------------------------------------------------------------------------------------------
// 3) CALCULO DE PROMEDIO POR GENERO
// ---------------------------------------------------------------------------------------------------------------
function calculate(dataUpdate) {
    const n = dataUpdate.length; // cantidad de personas
    const numberMen = dataUpdate.filter(person => person.genre==='hombre').length; // cantidad de hombres
    const numberWomen = Math.abs(n-numberMen); // cantidad de mujeres
    // suma del IMC de los hombres
    const sumaIMCmen = dataUpdate.filter(person => person.genre==='hombre').map(person=>parseFloat(person.IMC)).reduce((a,b) => a+b );
    // suma del IMC de las mujeres
    const sumaIMCwomen = dataUpdate.filter(person => person.genre==='mujer').map(person=>parseFloat(person.IMC)).reduce((a,b) => a+b );
    // promedio del IMC de hombres
    const averageIMCmen = (sumaIMCmen / numberMen).toFixed(1);
    // promedio del IMC de mujeres
    const averageIMCwomen = (sumaIMCwomen / numberWomen).toFixed(1);
    // promedio del IMC de ambos
    const averageIMC = (( parseFloat(averageIMCmen)+ parseFloat(averageIMCwomen) ) / 2 ).toFixed(2);

    return [ n ,numberMen,numberWomen,averageIMCmen,averageIMCwomen,averageIMC ]
}



// ---------------------------------------------------------------------------------------------------------------  
// 4) DIBUJAR PROMEDIOS EN UNA TABLA
// ---------------------------------------------------------------------------------------------------------------

function drawTableWithAverages(numberMen,averageIMCmen,numberWomen,averageIMCwomen,n,averageIMC){
    const containerTableStatistics = document.querySelector('.container-tableStatistics');
    containerTableStatistics.innerHTML = `
        <table class="tableStatistics">
            <tr>
            <th id="n"> </th>
            <th>Conteo</th>
            <th>IMC Promedio</th>
            </tr>
            <tr>
            <th>Hombre</th>
            <td id="">${numberMen}</td>
            <td>${averageIMCmen}</td>
            </tr>

            <tr>
            <th>Mujer</th>
            <td id="">${numberWomen}</td>
            <td>${averageIMCwomen}</td>
        
            </tr>

            <tr>
            <th>Total</th>
            <td>${n}</td>
            <td>${averageIMC}</td>   
            </tr>
        </table>
`
}


// ---------------------------------------------------------------------------------------------------------------
// 5) GRAFICA DE BARRAS con chart.js  ->  https://www.chartjs.org/
// ---------------------------------------------------------------------------------------------------------------
function drawBars(dataUpdate) {
    const chartDOM = document.getElementById('chart');

    function cat(dataUpdate,genre,state){
        //entrada: data: array con objetos
        // genre: string indicando género
        // state: string indicando estado ('debajo', 'saludable', 'sobrepeso','obeso','riesgo')
    
        // salida : cantidad de personas según soble categoría(hombre y state , mujer y state)
    
        return dataUpdate.filter( person => person.genre===genre && person.state===state ).length  ;
    }

    const chart = new Chart(chartDOM , {
    type: 'bar',
    data: {
        labels: ['debajo', 'saludable', 'sobrepeso','obeso','riesgo'],
        datasets: [{
            label: 'Hombres',
            data: [cat(dataUpdate,'hombre','debajo'),cat(dataUpdate,'hombre','saludable'),cat(dataUpdate,'hombre','sobrepeso'),cat(dataUpdate,'hombre','obeso'),cat(dataUpdate,'hombre','riesgo')] ,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        } ,
        {
            label:"Mujeres",
            data: [cat(dataUpdate,'mujer','debajo'),cat(dataUpdate,'mujer','saludable'),cat(dataUpdate,'mujer','sobrepeso'),cat(dataUpdate,'mujer','obeso'),cat(dataUpdate,'mujer','riesgo')] ,
            backgroundColor : 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 2)',
            borderWidth: 1
        }
        ]
    },
    options: {
        plugins: {
            title: {
              display: true,
              text: 'Estado del peso por género',
            },
            scales: {
               y: {
                   display:true,
                   title:{
                       display:true,
                       text:'F'
                   }
               }
            }
          }
    }
});

}


// ---------------------------------------------------------------------------------------------------------------
// 5) Agregar filas a la tabla de usuario
// ---------------------------------------------------------------------------------------------------------------
function addRowsToUserTable(dataUpdate) {
    const tablaUsers = document.querySelector(".tableUsers");

    dataUpdate.forEach( person => {
        const {genre, age, weight, height , IMC ,state } = person ;
        tablaUsers.innerHTML += `
            <tr>
                <td>${genre}</td>
                <td>${age}</td>
                <td>${weight}</td>
                <td>${height}</td>
                <td>${IMC}</td>
                <td>${state}</td>
            </tr>
    `
})

}




