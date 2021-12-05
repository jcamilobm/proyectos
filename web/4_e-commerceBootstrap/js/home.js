import { Cart } from "./cart.js";

// DOM de referencia
const navAmountitems = document.querySelector('#navAmountitems');
// actualizar total de item en el menú de navegación
navAmountitems.textContent = Cart.getTotalItems() ; 

// en caso de que se cargue el catálogo sin elegir categoria.
localStorage.setItem('chosenCategory' , 'paneles' );


// contenedor de las tarjetas en Home de algunas categorias(solo 3)
const containerCategorias = document.getElementById('container-categorias');

// determinar la categoria elegida desde home
containerCategorias.addEventListener('click', e =>{
    // identificar botón de cada categoria en Home
    const btnElegido = e.target;
    // hallar del nombre de su attributo id la categoria
    const categoriaElegidaDesdeHome = btnElegido.getAttribute('id');
    // establecer en el localStorage el id para tenerlo como referencia en el catálogo y mostrar los datos de interes.
    localStorage.setItem('chosenCategory' , categoriaElegidaDesdeHome )
})



