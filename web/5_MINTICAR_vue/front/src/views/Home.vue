<template >
  <v-container fluid class="transparent">

       <!------------ presentación empresa ----------->
    <v-row justify="space-around">
      <v-col cols="12" sm="7" class="d-flex flex-column justify-center align-center">
                
              <h1  class="text-lg-h1  text-md-h1 "
              >Bienvenido</h1>
              
              <p>Comienza el proceso de una manera ágil</p>
             
              <div class="my-2"  >
                  <v-btn 
                    v-if=isLoggedIn()
                    x-large
                    color="success"
                    dark
                    to='/catalogo'     
                  >
                    RESERVAR
                  </v-btn>
                   <v-btn 
                    v-else
                    x-large
                    color="success"
                    dark
                    to='/login'     
                  >
                    RESERVAR
                  </v-btn>

              </div>
            

      </v-col>
      <!-- imagen home -->
      <v-col cols="12" sm="5">
      
        <v-img
        cover
          src="../assets/img/home.jpg"
          max-height="350"
          max-width="350"
          aspect-ratio="0.8"
        ></v-img>
      </v-col>

    </v-row>

    <!-- ------- fin bienvenidad página home ------------>


    <!-- ---------seccion de opiniones clientes -->
    <v-row>
       <v-col cols="12"  lg="3" class="d-flex align-center" >
             <v-img 
             class="hidden-sm-and-down"
        cover
          src="../assets/img/person-opinion-2.png"
          max-height="300"
          max-width="300"
          aspect-ratio="0.8"
        ></v-img>
      </v-col>
      <v-col cols="12"  lg="9">
            <tarjetasOpiniones/>
      </v-col>
    </v-row>

    <!-- contenedor formulario de contacto  -->
    <v-row>
      <v-col>
        <!--formulario de contacto  -->
        <Contacto/>

      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import tarjetasOpiniones from "../components/TarjetasOpiniones.vue"

export default {
  name: "Home",

  components: { tarjetasOpiniones },
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
    };
  },

  methods: {
     isLoggedIn() {
        return sessionStorage.getItem('username') != undefined;
    } ,
  }
};
</script>

<style scoped>
v-carousel-item {
  background-position: center;
  background-size: cover;
}
</style>


