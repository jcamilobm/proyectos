<template>
  <v-app id="inspire">

      <!-- ----------------------------------------------------------- -->
    <!--  ----------CONTENIDO ESTÁTICO ---------------- -->
    <!-- ----------------------------------------------------------- -->

    <!-- INICIO menú lateral de navegación -->
    <v-navigation-drawer v-model="drawer" app temporary >

      <!-- Instanciar componente Menu lateral -->
      <MenuLateral :title="title"  /> 
      <!-- :title envía esa variable al Menu -->

    </v-navigation-drawer>

    <!-- FIN menú lateral de navegación -->

    <!-- INICIO barra superior de navegación -->

    <MenuSuperior 
      :title="title" :drawer='drawer' 
      v-on:EventoChangeDraw="onChildClick"
      @open-login="showLogin=true" 
  
    /> 

    <!-- FIN barra de superior de navegación -->
<!-- @open-register="showRegister=true"  -->


    <!-- ----------------------------------------------------------- -->
    <!--  ----------CONTENIDO DINÁMICO ---------------- -->
    <!-- ----------------------------------------------------------- -->

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>

      </v-container>

      
    </v-main>


    <!-- Componente Footer(estático) -->
    <Footer/>


    <!-- Diálogo para iniciar sesión -->
    <v-dialog v-model='showLogin' pesistent max-width="400">
          <Login @login-success="showLogin=false"/>      
           <!-- showLogin = false -->
    </v-dialog>

      <!-- Diálogo para registrasrse -->
   

  
  </v-app>

</template>


<script>
import MenuLateral from "./components/MenuLateral.vue";
import MenuSuperior from "./components/MenuSuperior.vue";
import Footer from "./components/Footer.vue"
import Login from "./views/Login.vue"


export default {
  name: "App",
  components: { MenuLateral ,
                MenuSuperior,
                Footer ,
                Login ,
                },

  data() {
    return {
      drawer: false,
      title: "MINTICAR",

      showLogin: false,
      
    };
  },
  methods: {
    onChildClick(value) {  /* el hijo para este caso es el Menu Superior */
      this.drawer = value ;
    }
  }
};
</script>
