//IMPORTAR CARRITO PARA AGREGAR PERSONA
import { Cart } from "./cart.js";

/* DOM de referencia */
const form = document.getElementById('form');
const btnFormat = document.getElementById('btnForm');

// capturar submit
form.addEventListener('submit' , e => {
    e.preventDefault(); // previene que se refresque la página al envíar un formulario.
    // Capturar los datos de la persona
    const person = catchDataForm();
    // agregar información de la persona al carrito.
    Cart.addPerson(person)
    // terminar el proceso: Agregar compra a un json y limpiar localStorage
    Cart.finishTheProcess();

    // mostrar alerta de confirmación de la compra
    showAlert();
    // volver a la página de inicio después de 2.5 segundos
    backHome();
})

function  catchDataForm() {
    const inputName = document.getElementById('inputName').value;
    const inputEmail = document.getElementById('inputEmail').value;
    const inputNoCreditCard = document.getElementById('inputNoCreditCard').value;
    const inputDate = document.getElementById('inputDate').value;
    const inputCVV = document.getElementById('inputCVV').value;

    const person = {
        name : inputName ,
        email : inputEmail ,
        NoCreditCard : inputNoCreditCard ,
        date : inputDate ,
        CVV : inputCVV
    }

    return person;
}

function showAlert() {
    const myAlert = document.getElementById('myAlert')
    myAlert.style.display = 'block'
}

function backHome() {
    setTimeout( () => window.location.href = "../index.html"  , 2500)
}


