// se importan modulos de js
import { makeSlider } from './slider.js';
import {  makeScrollup } from './scroll.js';  


 //1) 
 
 // ELEMENTOS HTML de referencia

const containerHome = document.querySelector('.container-home');
const containerInfoMovie  = document.querySelector('.container-info-movie');
containerInfoMovie.style.display = "none";  // se esconde mientras el usuario elige la película del catálogo.

const imgContainer= document.querySelector('.img-container');  // imagen de las tarjetas
const btnPrev = document.querySelector('.btn-sliderPrev');  // botón previo del slider
const btnNext = document.querySelector('.btn-sliderNext');  // botón siguiente del slider
 
const cardsGrid = document.querySelector('.cards-grid');  // contenedor de tarjetas página principal

const scrollUp = document.querySelector("#scroll-up");   // boton para desplazamiento vertical.
// innocar flecha para volver a barra de navegación.
makeScrollup( scrollUp );


// ------------------------------------------------------------------------------------

 // 2) 
 
// ***********************************************************************
//          Cargar JSON LOCAL con datos de las películas. 
// ************************************************************************
//  https://github.com/FEND16/movie-json-data/blob/master/json/movies-coming-soon.json

 // ¿ cómo cargar archivos JSON ?
 // a) fetch('url')  para obtener una promesa.
 // b) El método .then() aplicado a la promesa devuelve un obejto response.
 // c) El método .json() devuelve el cuerpo de la respuesta que también es una promesa.
 // d) .then() procesa la promesa para trabajar finalmente con los datos.

/* async function fetchMovies(){
    const response =  await fetch('./data/movies2018.json');
    const data = await response.json() 
    console.log(data);
}
fetchMovies() */

fetch('./data/movies2018.json')
.then( response => response.json() )
.then( movies => {

        // hacer cosas con los datos una vez se cumpla la promesa ...

        // dibujar todas las películas en el catálogo de la página principal
        setAllMovies( movies );

        // dibujar slicer 
            // a) capturar las películas con puntaje igual o mayor a 7.5
            const arrayTopMovies = movies.filter( movie => movie['imdbRating'] >= 7.5 );
                
            // b) mostrar en el SLIDER las mejores películas.
            makeSlider(btnPrev , btnNext , arrayTopMovies , imgContainer);

        // página con detalles de una sola pelicula. Es un evento a la espera del click en catálogo de películas.
        goMovieDetails(cardsGrid , movies)
       
} );


//---------------------------------------------------------------------------------------------------

//3)


// dibujar las tarjetas a partir de los objetos contenidos en el array de datos.
function setAllMovies(movies) {
/*     <div class="card">
            <img id="1" src="https://images-na.ssl-images-amazon.com/images/M/MV5BMjQxMDE5NDg0NV5BMl5BanBnXkFtZTgwNTA5MDE2NDM@._V1_SY500_CR0,0,337,500_AL_.jpg">
            <div card-info>
                <h2 >Game Night</h2>
                <i class="fas fa-star"></i>
                <span class="card-info-rating">7.8</span>
            </div> 
    </div>  */

    movies.forEach( movie => {
            
            // crear tarjeta y asignarle su clase
            const  card = document.createElement('div');
            card.setAttribute('class','card')
            // crear imagen y asignarle su url y id
            const imgMovie = document.createElement('img');
            imgMovie.setAttribute( 'id' , movie.id);
            imgMovie.setAttribute( 'src' , movie.posterurl); 
            
            // texto de la tarjeta
            const cardInfo = document.createElement('div');
            cardInfo.setAttribute('class','card-info');

            const cardTitle = document.createElement('h2'); 
            cardTitle.innerHTML = `${movie.title}`;
            const cardIcon = document.createElement('i');
            cardIcon.setAttribute('class','fas fa-star');
            const rating = document.createElement('span');
            rating.innerText = `${movie.imdbRating}` || "Sin puntaje";

            // se crea un Fragment para poder aagregar varios hijos con appendChild()
            const documentFragmentInfo = document.createDocumentFragment();
            documentFragmentInfo.appendChild(cardTitle );
            documentFragmentInfo.appendChild(cardIcon );
            documentFragmentInfo.appendChild(rating );
            // ahora se agrega el fragment al contenedor real
            cardInfo.appendChild(documentFragmentInfo); 

            // se crea otro fragment para agregar tanto la imagen como el texto con appendchild()
            const  documentFragmentCard =  document.createDocumentFragment();
            documentFragmentCard.appendChild(imgMovie ); 
            documentFragmentCard.appendChild(cardInfo); 
            card.appendChild(documentFragmentCard);
            
            cardsGrid.appendChild(card); 

    });

}



//-----------------------------------------------------------------------------------------------
/* simualción de NAVEGABILIDAD con display block y none */

function showMovie() {
    containerHome.style.display = 'none'
    containerInfoMovie.style.display = 'flex';
    
}



function goMovieDetails( cardsGrid , movies) {
    
    // Se instala un escuchador en el padre de todas las tarjetas(cards-grid) para
    // utilizar la delegación de eventos así se evita un escuhador por cada tarjeta.

    // Delegación de eventos: como el padre tiene un evento los descendientes también escuchan.

    // Se identifica cada película dibujando en su atributo id el id que viene de la base de datos
    // teneindo la película identificada se muestra su contenido ocultando parte de la página de inicio.

    cardsGrid.addEventListener('click', evento => {

       const idMovie = evento.target.id ;
    
        if( idMovie !== ''){ // en caso de que le le click a los demás hijos de card, idMovie no tendra id,por tanto se excluyen.
            
            // buscar en datos el id encontrado
            // .find() encuentra el primer elemento que cumpla la condición en un array.
            // lo utilizo en vez de filter para no recorrer el array completo conociendo que solo hay un elemento que cumple esta condición.       
            let objetDetailsMovie = movies.find( movie => movie.id === idMovie ) ;

            // invocar función que dibuja html de la película elegida.
            setMovieDetails(objetDetailsMovie )

            // Se oculta slicer y catálogo para mostrar en la misma página de inicio detalles de la película elegida.
            showMovie()
    
        }     
    })

}


// se dibuja la película elegida.
function setMovieDetails( { title , genres , storyline , actors , imdbRating,posterurl } ) { // se desestructura el objeto movie por facilidad
            
             // dibujar HTML con contenido de la película elegida
             /* containerInfoMovie.innerHTML = `${objetDetailsMovie.title} , ${objetDetailsMovie.id}` */
        
             containerInfoMovie.innerHTML = `
                                            <img src="${posterurl}" >
                                            <div class="info-movie">
                                                <div class="title-rating">
                                                    <h1>${title}</h1>
                                                    <i class="fas fa-star">${imdbRating || 'Unrated'}</i>
                                                </div>
                                                <ul class="info-list genre-list">
                                                    ${ genres.map( genre => `<li>${ genre }</li>`) }
                                                </ul>
                                                <p>${storyline}</p>
                                                <ul class="info-list actor-list">
                                                    ${ actors.map( actor => `<li>${ actor }</li>`) }
                                                </ul>

                                            </div> 
                                      `
}




  
/* <img src="https://images-na.ssl-images-amazon.com/images/M/MV5BMTk2Mjc2NzYxNl5BMl5BanBnXkFtZTgwMTA2OTA1NDM@._V1_SY500_CR0,0,320,500_AL_.jpg" >
<div class="info-movie">
    <div class="title-rating">
      <h1>Annihilation</h1>
      <i class="fas fa-star">7.8</i>
    </div>
    <ul class="genre-list info-list">
        <li>terror</li>
        <li>miedo</li>
    </ul>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolores cumque ipsam sequi id accusamus. Quam unde sint distinctio possimus magnam cum deserunt, reiciendis quasi eaque eum vitae numquam. Minima.</p>
    <ul class="info-list actor-list">
      <li>nombre actor 1</li>
      <li>nombre actor 2</li>
    </ul>

  </div> */