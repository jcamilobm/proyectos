
// importar la función que permite guardar lista de objetos(lista de compras)
// se utiliza al final de la compra
import { saveLocalStorage } from "./helper/saveListbjetsLocalStorage.js";

// CLASE carrito para agrupar varias funcionalidades
export class Cart {

    constructor() {
        this.amount ; // cantidad total de items
        this.total ; // valor total de la compra
    }

    // los métodos static No necesitan instanciarse, se utiliza diractamente la clase.

    static addItem(itemToAdd) {
      
        // se crea un carrito la primera vez en el local Storage
        if(localStorage.getItem('cart') === null) {
            localStorage.setItem('cart' , JSON.stringify( {items:[] , totalItems:0 , total:0 , person:[]} ) )
        }
    
        // obtener items actuales del localStorage(se debe pasar a JSON valido en js)
        const arrayItems = JSON.parse( localStorage.getItem('cart')).items ;
       
        // verificar si el item ya está en el carrito mediante su id
        const itemIsNew = !arrayItems.some( item => item.id == itemToAdd.id)   
        if( itemIsNew  ){ // si el producto NO existe en el array de items
             // agregar nuevo item el el array
             arrayItems.push(itemToAdd) 
             // actualizar atributo con el total de items
             this.amount = this.findTotalItems(arrayItems) ;
             // actualizar atributo con  el total de la venta
             this.total = this.calculateTheTotalToPay(arrayItems) ;
             // cargar en el localStorage
             localStorage.setItem('cart', JSON.stringify( {items:arrayItems  , totalItems:this.amount, total:this.total , person:[]} ) )
        } else { // de lo contrario si YA existe el item ,solo se debe actualizar sus valores.
             // hallar index del item existente
             const index = arrayItems.findIndex( item => item.id == itemToAdd.id );
             // actualizar array de item en el local storage enviando el array y el indice del item a actualizar.
             this.updateArrayItems(arrayItems  , index  , itemToAdd)
        }
    
    }

    static updateArrayItems(arrayItems, i ,itemToAdd) {
        
        const item = arrayItems[i];
        // aumentar cantidad del item a comprar en uno
        item.amount = item.amount + itemToAdd.amount ;
        // calcular nuevo subtotal
        item.subTotal = item.price * item.amount ;
        // actualizar el item
        arrayItems.splice(i, 1, item) // reemplazar a partir de la posición i un elemento con item actualizado.
        // actualizar el total de items
        this.amount = this.findTotalItems(arrayItems)
        // actualizar el total de la venta
        this.total = this.calculateTheTotalToPay(arrayItems)
        localStorage.setItem('cart', JSON.stringify( {items:arrayItems  , totalItems:this.amount, total:this.total , person:[]} ) )
    }


     static deleteItem (id)  {
         // obtener items actuales del carrito guardados en el localStorage
        const arrayItems  = this.getItems() ; 
        // crear un nuevo array eliminando el item
        const arrayItemsFilter =  arrayItems.filter(item => item.id!=id);
        this.amount = this.findTotalItems(arrayItemsFilter )
        // actualizar el total de la venta
        this.total = this.calculateTheTotalToPay(arrayItemsFilter)
        // guardar el array filtrado en el localStorage
        localStorage.setItem('cart', JSON.stringify( {items:arrayItemsFilter  , totalItems:this.amount, total:this.total , person:[]} ) )
    }

    /*------   métodos auxiliares  ----------------*/


    static findTotalItems(arrayItems) { 
        // se obtiene del array de item solo la cantidad de items(amount) y después se suma con reduce
        return arrayItems.map(item=>item.amount).reduce((previousAmount, currentAmount) => previousAmount + currentAmount , 0 ) ;
     }
 
     static calculateTheTotalToPay(arrayItems) {    
        // calcular el total a pagar hasta ahora
        return  arrayItems.map(item => item.subTotal).reduce((previousSubt, currentSubt) => previousSubt + currentSubt , 0 )
     }


    // agregar persona
    static addPerson(person) {
        localStorage.setItem('cart', JSON.stringify( {items:this.getItems()  , totalItems:this.getTotalItems(), total:this.getTotal() , person } ) )
    }

    static finishTheProcess() {
        // obtener resumen de compra
        const bill = JSON.parse(localStorage.getItem('cart')); // se pasa a objet javascript ya que la fucnión la requiere así.
        // limpiar local Storage menos los registros de facturas(bills)
        localStorage.removeItem('cart');
        localStorage.removeItem('idChosenitem');

        // guardar en un array de objetos la nueva compra
        saveLocalStorage(bill , 'bills')

    }


    // métodos para mostrar capturar datos del localStorage rápidamente.

    static getTotal() {    
        if(JSON.parse( localStorage.getItem('cart'))===null){
            // en caso de que se intente acceder  sin haber creado el objeto en LocalStorage
            return ''
        }
        return JSON.parse( localStorage.getItem('cart')).total ;
    }

    static getTotalItems() {
        if(JSON.parse( localStorage.getItem('cart'))===null){
            // en caso de que se intente acceder  sin haber creado el objeto en LocalStorage
            return ''
        }
        return JSON.parse( localStorage.getItem('cart')).totalItems;
    }

    static getItems() {
        if(JSON.parse( localStorage.getItem('cart'))===null){
            // en caso de que se intente acceder  sin haber creado el objeto en LocalStorage..
            return ''
        }
        return JSON.parse( localStorage.getItem('cart')).items;
    }

}








/* 
cart = {
    items: [
        {
         name ,
         imagen,
         amount ,
         price,
         subTotal
        } ,
        {
          name ,
          imagen,
          amount ,
          price,
          subTotal
        } 
    ] ,

    person : {
        name ,
        email ,
        numCard,
        dueData,
        CVV
    } ,
 
    total
} */


/* item = {
    id
    name:'solar2' ,
    imagen:'/iamgen',
    amount:2 ,
    price:20,
    subTotal:40
   } ;

document.addEventListener('DOMContentLoaded', () => {
  
    addItem(item) ;

    //deleteItem ('solar2')

}) */
