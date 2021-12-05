
<template>

  <div>
     
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> {{title}} </v-list-item-title>
        <v-list-item-subtitle> {{subtitle}} </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

      <!-- foto de perfil y nombre -->
      <v-list-item two-line v-if=isLoged() link to="/perfil">
          <v-list-item-avatar>
            <img src="../assets/img/perfil_por_defecto.jpg">
            <!-- <img src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned"> -->
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title link to="/perfil"> {{username}} </v-list-item-title>
            <v-list-item-subtitle> {{rol}} </v-list-item-subtitle>
          </v-list-item-content>
      </v-list-item>

    <v-divider></v-divider>
  
      
    <!-- Opciones de todos los roles de usuario-->

    <v-divider></v-divider>
    
    <v-list dense nav>
      <div  v-for="item in items" :key="item.title" >

        <v-list-item link :to="item.path" v-if="item.show"> <!--si no es admin se esconden ciertos botones.-->
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

      </div>
    </v-list>

    
  </div>

</template>

<script>
export default {
  name: "Menu",
  props: [
    "title",
    "isAdmin",
  ] /* lo que le envía el padre a sus componentes hijos.*/,
  data() {
    return {
      /* Datos iniciales */
      subtitle: "a tu servicio",

      // show:true, con o sin autenticación se puede ver esa página
      items: [
         {title: "Dashboard", icon: "mdi-view-dashboard", path: "/admin/dashboard",show:this.hasRole('admin')},
        {title: "Gestión de Catálogo", icon: "mdi-car-wrench", path: "/admin/gestioncatalogo",show:this.hasRole('admin')},
        {title: "Gestión de Usuarios",icon: "mdi-account-circle",path: "/admin/gestionusuarios", show:this.hasRole('admin')},
        {title: "Gestión de Recibos",icon: "mdi-text-box-search",path: "/admin/gestionrecibos", show:this.hasRole('admin')},

        { title: "Inicio", icon: "mdi-home", path: "/" ,show:true},
        { title: "Catálogo", icon: "mdi-car-hatchback", path: "/catalogo" ,show:true },
        { title: 'Mis reservas', icon: 'mdi-text-box-plus' ,path:'/consultarreserva',show: this.hasRole('client') },  
        { title: "Equipo", icon: "mdi-account-group", path: "/equipo" ,show:true},
        { title: "FAQ", icon: "mdi-frequently-asked-questions", path: "/faq" ,show:true},
        { title: "PQRS", icon: "mdi-comment-text", path: "/pqrs" ,show:true},
      ],

      /* right: null, */
    };
  },
  
  methods: {

    isLoged() {
      return sessionStorage.getItem('userType')!=undefined
    } ,

    hasRole( userType) {  // recibe rol a verificar  
        // verificar en la base de datos si tiene tal rol
        // llamar al backend de usuarios y verificar si ese username tiene ese rol 
        return sessionStorage.getItem('userType') ==  userType  // la idea es que esto llame al backend ;)  
    }
  } ,
 
  computed: {
    username() {
      return sessionStorage.getItem('username');
    },
    rol() {
      return sessionStorage.getItem('userType');
    }
  } 
};
</script>

<style>
</style>