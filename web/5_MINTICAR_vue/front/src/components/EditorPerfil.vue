<template>
  <v-app class="container">
    <v-icon x-large color="blue">mdi-account-circle</v-icon>
    <h1 class="form-title">Datos del perfil</h1>
    <v-form v-model="valid" ref="form">
      <v-container >
        <!-- ~ CAMPOS NOMBRE Y APELLIDOS -->
        <v-row class="v-row">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              :counter="50"
              label="Nombres"
              required
              append-icon="mdi-account-settings"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              :counter="50"
              label="Apellidos"
              append-icon="mdi-account-settings"
              required
            ></v-text-field>
          </v-col>
        </v-row>


        <!-- ~ USUARIO , CAMPO CORREO Y TELEFONO -->
        <v-row class="v-row">
              <v-col cols="12" md="4">
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              :counter="10"
              label="Nombre de usuario"
              required
              append-icon="mdi-form-textbox"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
              append-icon="mdi-email"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model.number="cellphone"
              :rules="numberRules"
              label="Número de teléfono"
              required
              append-icon="mdi-cellphone"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- ~ CAMPO TIPO DOCUMENTO Y DOCUMENTO -->
        <v-row class="v-row">
          <!-- <v-col class="d-flex mt-3" cols="12" sm="6">
            <v-select
            disabled
              :items="items"
              label="Tipo de documento"
              v-model="tipoDocumento"
              dense 
              outlined
              required
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
            disabled
              v-model.number="documento"
              :rules="numberRules"
              :counter="14"
              label="Número de documento"
              required
              append-icon="mdi-card-account-details"
            ></v-text-field>
          </v-col> -->

          <v-col class="flex-boton d-flex justify-center ">


              <v-btn class="mx-2"  @click="LimpiarPerfil()" color="secundary" depressed elevation="4" outlined rounded text
              >Limpiar</v-btn >

              
              <v-btn class="mx-2" @click="actualizarPerfil()" color="success" depressed elevation="4" outlined rounded text
              >Actualizar</v-btn >
         
          <!-- <div>
            <v-btn color="primary" depressed elevation="2" outlined rounded text 
              >¿Tienes cuenta? Inicia sesión</v-btn
            >
          </div> -->
           </v-col>

        </v-row>
        
      </v-container>


      <!-- mensaje de notificación -->
       <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ textSnackbar}}

            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                Cerrar
              </v-btn>
            </template>
      </v-snackbar>
      <!-- fin  mensaje de notificación -->
    </v-form>

  </v-app>
</template>

<script>
import { updateUser } from "../controllers/User.controller";  //  controlador para crear usuario.

export default {
  data: () => ({
    valid: false,
    name: sessionStorage.getItem('nameCliente'),
    lastname: sessionStorage.getItem('lastNameCliente'),
    username: sessionStorage.getItem('username'),
    email: sessionStorage.getItem('email'),
    cellphone: sessionStorage.getItem('cellphone'),
    // tipoDocumento: sessionStorage.getItem('tipoDocumento'),  // no se lleva a base de datos
    // documento: sessionStorage.getItem('documento'),

    // items: ["C.C", "C.E", "Pasaporte"],
    items:[sessionStorage.getItem('tipoDocumento')],
    nameRules: [
      (v) => !!v || "Required",
      (v) => v.length <= 50 || "Name must be less than 10 characters",
      (v) => /^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(v) || "Name/Lastname is incorrect",
    ],
    usernameRules: [
      (v) => !!v || "Required.",
      (v) => /^[a-zA-Z0-9]{4,16}$/.test(v),
    ],
    passwordRules: [
      (v) => !!v || "Required",
      (v) => v.length >= 3 || "Password must be greater than 6 characters",
    ],
    emailRules: [
      (v) => !!v || "Required",
      // (v) => /.+@.+/.test(v) || "E-mail must be valid",
      (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid",
    ],
    numberRules: [
      (v) => !!v || "Required",
      (v) => /^\d{1,16}$/.test(v) || "Only numbers",
    ],

    // datos mensaje de notificación
     //   datos para el  aviso que se despliega al guardar exitosamente.
    snackbar: false,
    textSnackbar: "",
    timeout: 8000,
  }),

  methods: {

      // cancelarregistro() {
      //   this.$router.push("/");
        
      // },

      LimpiarPerfil() {
          this.$refs.form.reset();
      } ,

      actualizarPerfil() {

      
        if (this.valid) {  // si es valido el formulario actualizar usuario en base de datos permanente

            // actualizar perfil 
             const user= {
                    username: this.username,
                    email :  this.email ,
                    cellphone:  this.cellphone ,
                    name: this.name ,
                    lastname: this.lastname ,
                    // documento: this.documento ,
                    // tipoDocumento:this.tipoDocumento
        };

        // actualizar carro si se puede de lo contrario:
        updateUser(sessionStorage.getItem('idUser') , user)
          .then(() => {
            // desplejar mensaje de notificación
            this.textSnackbar = "Perfil actualizado con éxito.";
            this.snackbar = true; //para desplegar aviso de que se agrego el producto al catàlogo.

            // actualizar localStore para que no deba loguerse de nuevo para ver cambios en el perfil
             sessionStorage.setItem("username", user.username);
             sessionStorage.setItem("nameCliente", user.name);
             sessionStorage.setItem("lastNameCliente", user.lastname);
             sessionStorage.setItem("email", user.email);
             sessionStorage.setItem("cellphone", user.cellphone);
             window.location.reload();

          })
          .catch((err) => console.error(err));

        } else { // de lo contrario notificar para corregir error con un snackbar
              console.log("corrige erratas en registro.")
              this.textSnackbar =" Llena los campos del perfil por favor."
              this.snackbar = true;
        }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
}
.form-title {
  text-align: center;
}
.flex-boton {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin-top: 10px;
}
.v-row {
  margin: 10px 0;
}
</style>