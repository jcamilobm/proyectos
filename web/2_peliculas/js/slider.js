/* FUNCION SLIDER */

  // lógica slider -> fuente: Web Zone


    // entradas :   botones previo y siguiente.
    //              array con URL de las imagenes y otros datos
    //              contenedor para bakkground de la imagen
    //              array con los datos que se dibujan en cada plantilla.


function makeSlider( htmlBtnPrev  , htmlBtnNext , dataArray , htmlImgContainer ) {

    const  addSlice = (i=0) => { // por defecto i = 0, para la iamgen de carga carga.
        /* imgContainer.innerHTML = ''; */
        htmlImgContainer.style.backgroundImage = `url(${ dataArray[i].posterurl})` 
        htmlImgContainer.innerHTML = `
        <div class="slider-info">
        <h1> ${dataArray[i].title}  ${dataArray[i].imdbRating} </h1>
        <div>`
        return htmlImgContainer;
    }

    addSlice(); // se invoca para la imagen inicial

    let i= 0;
    const prev = () => {
        if( i <= 0 ) {  // si el índice llega a cero se restablece el índice al tamaño del array.
            i = dataArray.length ;
        }
        i--;
        return addSlice(i);
    }
    const next = () => {    // si el índice llega a la última posición se restablece índice a la posicón inicial-1.
        if( i >= dataArray.length  - 1){
            i =- 1;
        }
        i++;
        return addSlice(i);
    }
    
    // elementos HTML pendientes de la acción antés y después.
    htmlBtnPrev.addEventListener('click', prev);
    htmlBtnNext.addEventListener('click', next);
    
}


// exportar función para utilizar en otro módulo js

export { makeSlider } ;