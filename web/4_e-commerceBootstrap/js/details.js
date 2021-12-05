
// cargar datos

import {data} from "../data/data.js"
/* import {addItem } from "./cart.js"; */
import { Cart } from "./cart.js";

// cargar id del producto elegido 
const idChosenitem = localStorage.getItem('idChosenitem');

// DOM de referencia 
const cardIMG = document.querySelector('.img-card')
const cardTitle = document.querySelector('.card-title');
const cardPrice = document.querySelector('.card-price');
const cardText = document.querySelector('.card-text');
const navAmountitems = document.querySelector('#navAmountitems');

// Hallar item con id envíado desde catálogo a través del localStorage

const item = data.find(item => item.id == idChosenitem); // utilizó igualdad no estricta ya que el id de la abse de datos es Number pero el que devuelve localStorage es un string.

// Cargar DOM con contenido
cardIMG.setAttribute('src',item.image); 
cardTitle.textContent  = item.name;
cardPrice.textContent  = 'COP '+ item.price
cardText.textContent = item.description;


// --------------------------------------------------------
// cargar en el local storage los datos necesarios para el carrito

const btnAddItem = document.getElementById('btnAddItem');
const amountItems = document.getElementById('inputAmountItems');

// cargar cantidad de item el icono de la abrra de navegación
navAmountitems.textContent = Cart.getTotalItems();

btnAddItem.addEventListener('click' , () => {
    // si el unput tiene una cantidad mayor a cero
        if(amountItems.value>0) {
            const chosenItem = {
                id:item.id ,
                name: item.name ,
                image : item.image,
                amount : parseInt(amountItems.value) ,
                price : parseFloat(item.price) ,
                subTotal: amountItems.value * item.price  ,
            }
            
             // agregar al carrito el nuevo item(se agrega al localStorage)
            Cart.addItem(chosenItem) ;       
    
            // cargar cantidad de item el icono de la abrra de navegación
            navAmountitems.textContent = Cart.getTotalItems(); 
            
            showAlert()
        } else{ // no permitir envio si la cantidad de item es cero o menor bloqueando el botón de envío.
            btnAddItem .disabled = true
        }
        
})



/* ------------------funciones auxialiares -------------------*/

/* alerta para notificar que se agrego al carrito el producto */
function showAlert() {
    const myAlert = document.getElementById('myAlert')
    // mostrar alerta
    myAlert.style.display = 'block'
    // después de 2,5 ocultar de nuevo la alerta
    setTimeout( () => myAlert.style.display = 'none', 2500)
}


/* aumentar / disminuir cantidad de item en input*/
const plus = document.querySelector('#plus');
const minus =  document.querySelector('#minus');

let i = 0;
plus.addEventListener('click',() =>{
    i++ ;
    amountItems.setAttribute('placeholder',i)
    amountItems.setAttribute('value',i)
})

minus.addEventListener('click',() =>{
    if(i>0){
        i++;
    }  
    amountItems.setAttribute('placeholder',i)
    amountItems.setAttribute('value',i)
})







