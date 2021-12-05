// IMPORTAR CARRITO
import { Cart } from "./cart.js";

// DOM DE REFERENCIA
const navAmountitems = document.querySelector('#navAmountitems');

const containerCards = document.querySelector('#containerCards');
const templateCard = document.getElementById('template-card').content ;
const fragment = document.createDocumentFragment();

const totalDOM = document.querySelector('#total');
const btnNext = document.querySelector("#btnNext");

// Al cargar página
document.addEventListener('DOMContentLoaded', () => {
    navAmountitems.textContent = Cart.getTotalItems();

    // obtener del carrito el total d eitems
    const data = Cart.getItems();
    // dibujar datos 
    loadData(data);

})

// función para cargar datos y dibujar DOM
const loadData = data => {
    data.forEach(item => {
        const {id,name,image,amount,price,subTotal} = item ;
        templateCard.querySelector('.card-title').textContent = name;
        templateCard.querySelector('.card-img-top').setAttribute('src',image);
        templateCard.querySelector('.amount').textContent = amount;
        templateCard.querySelector('#price').textContent = price;
        templateCard.querySelector('#subtotal').textContent = subTotal;
        templateCard.querySelector('#btnTrash').dataset.id = id;

        const clone = templateCard.cloneNode(true) // con true es una clonación profunda(incluye contenido)
        fragment.appendChild(clone);
    })
    containerCards.appendChild(fragment);

    /* insertar valor total a pagar */
    totalDOM.textContent = `COP ${Cart.getTotal()}`;

    
    /* si no hay item agreados bloquear botón para continuar */
    btnNext.addEventListener('click',() =>{
        if( Cart.getTotalItems()==0 ){
            // en caso de que no hayan item no puede continuar el proceso de compra
            btnNext.disabled = true;
        }else{
            // si ya hay items se redirecciona al formulario para recoger datos personales del cliente.
            window.location.href = "./form.html"
        }
    })
    

    
}


/*------------------- eliminar item ---------------------------------*/
//se instala el escuchador padre para propagar la alerta de click a sus descendientes
containerCards.addEventListener('click' ,e => {
    // si se dio click en algún icono de la basura
    if(e.target.dataset.id != undefined) { 
        // borrar item
        Cart.deleteItem(  e.target.dataset.id  )
        // refrescar página para notar cambios
        window.location.reload();
    }
})






