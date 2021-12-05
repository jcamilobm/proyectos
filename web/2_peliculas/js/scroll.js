
// Autor scroll: Kolade Chris  , freeCodeAcademy.
// https://www.freecodecamp.org/news/how-to-build-a-developer-portfolio-website/


// al dar click sobre el scroll la página retoma lo más arriba.

const makeScrollup =  ( htmlscrollUp  ) => {

    htmlscrollUp.addEventListener("click", () => {
        window.scrollTo({  // Desplaza el visor a un conjunto específico de coodenadas en el documento.
          top: 0,
          left: 0,
          behavior: "smooth",  // desplazamiento suave
        });
      });
}

// para utilziar en otro modulo:
export {  makeScrollup } ;


