<template>
  <v-app-bar color="indigo darken-2" dark app>
    <v-app-bar-nav-icon @click="changeDrawer"></v-app-bar-nav-icon>

     <v-img
          class="mx-3"
          max-height="40"
          max-width="40"
          src="../assets/img/minticar-logo.png"
    ></v-img>
    <v-app-bar-title>{{ title }}</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn icon to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <!-- <v-btn icon to="/login">
          <v-icon>mdi-account-circle</v-icon>
      </v-btn> -->

    <v-menu left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item link  v-if="!isLoggedIn" @click="openLogin()" >
          <v-list-item-title>Iniciar sesión</v-list-item-title>
        </v-list-item>
        <v-list-item link  to='/registro' v-if="!isLoggedIn"  >
           <!-- @click="openRegister()" -->
          <v-list-item-title>Registrarse</v-list-item-title>
        </v-list-item>
        <v-list-item link  to='/perfil' v-if="isLoggedIn">
          <v-list-item-title>Perfil</v-list-item-title>
        </v-list-item>
        <v-list-item link  v-if="isLoggedIn" @click=" logOut()">
          <v-list-item-title> Salir</v-list-item-title>
        </v-list-item>
      </v-list>

    </v-menu>
  </v-app-bar>
</template>

<script>
// import Login from '../views/Login.vue';

export default {
  components: { },
  props: ["drawer", "title"],

  data() {
    return {
        
    }
  } ,

  methods: {
    changeDrawer() {
      /* $emit( nombre evento , datos a enviar al padre)  */
      this.$emit("EventoChangeDraw", (this.drawer = !this.drawer));
    },

    openLogin() {
      // emitir evento al padre(App) para abrir diálogo de login
      this.$emit("open-login",null);
    } ,

   
    logOut() {
        // sessionStorage.removeItem("username");
        // sessionStorage.removeItem("userType");
        // sessionStorage.removeItem("idUser");
        sessionStorage.clear()
        this.$router.push("/");
        window.location.reload(); // porque Vue no identifica cambios en sessionStorage en tiempo real.
      }
 
  },

  computed:{
      isLoggedIn() { // verificar si está logueado
        return sessionStorage.getItem('username') != undefined;
      } ,
    }

};
</script>

<style>
</style>