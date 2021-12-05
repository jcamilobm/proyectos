
// IMPORTAR DATOS
import {data} from "../data/data.js"
import { Cart } from "./cart.js";

 // ELEMENTOS DOM DE REFERENCIA
 const items = document.querySelector('.catalogue-content');
 const containerbtnsCategories = document.querySelector('#containerbtnsCategories');
 const templateCard = document.getElementById("template-card").content ;
 const fragment = document.createDocumentFragment();
 const navAmountitems = document.querySelector('#navAmountitems');

//apenas cargue la página se verifica la categoria actual escogida LA CUAL ESTÁ GAURDADA EN EL localStorage


//Hay dos formas en las que el usuario puede escoger:

//1) Forma uno: 
//Desde el incio se escoge y ya se trae el valor y apenas cargue la página de categoría se muestra
document.addEventListener('DOMContentLoaded', () => {
    // Dibujar botones con las diferentes categorias de los datos.
    loadCategoriesBotons(data);
    // cargar datos con la categoria elegida desde la página de inicio
    loadData(data.filter(item => item.category === localStorage.getItem('chosenCategory') ) ) ; 
    // actualizar el total de items en la barra de navegación
    navAmountitems.textContent = Cart.getTotalItems(); 
})

//2) Forma dos:
// Estar pendiente del boton de las categorias desde la pagina de catálogo
containerbtnsCategories.addEventListener('click',e=> {
    // identificar botón
    const btnChosen = e.target;
    const category = btnChosen.textContent ;
    // cargar datos con la categoria elegida desde el catálogo
    loadData(data.filter(item => item.category === category ) ) ;
})

// Al elegir un item se cargan sus detalles en otra página
//3) detalles del item elegido
items.addEventListener('click', e => {
    const idChosenitem = e.target.dataset.id ;
    // insumo para página de detalles del producto
    localStorage.setItem('idChosenitem' , idChosenitem)
})


//-------------- Funciones auxiliares -------------------------------

/* función dibujar datos */
const loadData = data => {
    data.forEach( item => {
        items.innerHTML= ''; // se limpia para recibir nueva categoria escogida.
        const {id,name,price,category,description,image} = item ;
        templateCard.querySelector('h5').textContent = name;
        templateCard.querySelector('img').setAttribute('src',image); 
        templateCard.querySelector('p').textContent = `COL ${price}`;
        templateCard.querySelector('.btn-dark').dataset.id = id;
        
        const clone = templateCard.cloneNode(true);

        fragment.appendChild(clone);
    })
     items.appendChild(fragment);
} 

// Dibujar botones con las diferentes categorias de los datos.
const loadCategoriesBotons = data => {
    // Hallar las diferentes categorias de los datos
    const categoriesData = findCategories(data);
    // Dibujar los botones con las diferentes categorias.
    categoriesData.forEach( category => {
        containerbtnsCategories.innerHTML += `
        <button type="button" class="btn btn-outline-primary">${category}</button>
        `
    })

}

// función para hallar las diferentes categorias de los datos
function findCategories(data) {
    // referencia:https://dev.to/clairecodes/how-to-create-an-array-of-unique-values-in-javascript-using-sets-5dg6
    const categories = [...new Set(data.map(item=>item.category))];
    return categories;
}


