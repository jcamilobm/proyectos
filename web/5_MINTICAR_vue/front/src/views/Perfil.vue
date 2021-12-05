<template>
  <v-card>
    <v-toolbar flat color="primary" dark  >
      <v-toolbar-title>User Profile</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab>
        <v-icon left> mdi-account </v-icon>
        Datos Perfil
      </v-tab>
       <v-tab>
        <v-icon left> mdi-lock </v-icon>
        Password
      </v-tab>
      <v-tab>
        <v-icon left> mdi-door </v-icon>
        Cerrar cuenta
      </v-tab>
     

      <v-tab-item>
        <!-- formulario para editar perfil -->
        <EditorPerfil />

      </v-tab-item>

      
      <v-tab-item>

            <!-------------------------------------Inicio formulario cambiar contraseña ------------------------------------->
            <!-- ------------------------------------------------------------------------------------------------------------------ -->
            <v-form v-model="valid" ref="form">
                <v-container >
                   <v-row class="v-row">

                        <v-col cols=12 md=12 lg=12>
                        <v-text-field
                          v-model="passwordOldDigitada"
                          :rules="[
                            passwordRules,
                            passwordOldDigitada === passwordOld || 'Contraseña incorrecta.',
                          ]"
                          :counter="12"
                          label="Contraseña actual"
                          required
                          :type="showPassword ? 'text' : 'password'"
                          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append="showPassword = !showPassword"
                        ></v-text-field>
                      </v-col>
                     
                      <v-col cols=12 md=12 lg=12>
                        <v-text-field
                          v-model="password"
                          :rules="passwordRules"
                          :counter="12"
                          label="Contraseña nueva"
                          required
                          :type="showPassword ? 'text' : 'password'"
                          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append="showPassword = !showPassword"
                        ></v-text-field>
                      </v-col>

                      <v-col cols=12 md=12 lg=12>
                        <v-text-field
                          v-model="repeatPassword"
                          :rules="[
                            passwordRules,
                            password === repeatPassword || 'Password must match',
                          ]"
                          :counter="12"
                          label="Repetir contraseña nueva"
                          required
                          :type="showPassword ? 'text' : 'password'"
                          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append="showPassword = !showPassword"
                        ></v-text-field>
                      </v-col>

                      <!-- botones para confirmar cambio de contraseña -->
                        <v-col class="flex-boton d-flex justify-center ">
                          
                          <v-btn class="mx-2" @click="changePassword()" color="primary" depressed elevation="4" outlined rounded text
                          >Cambiar</v-btn >
         
                      </v-col>

                 </v-row>

                 </v-container>
                 </v-form>


            <!------------------------------- fin formulario cambiar contraseña --------------------------------------->

      </v-tab-item>


        <!-- --------------------    Inicio  cerrar cuenta ------------ -->
        
      <v-tab-item>
      

        <v-card color="white" class="mx-10 d-flex flex-column flex-wrap align-item">

          <v-card-title class="hidden-sm-and-down mx-10 text-h5 "> Cerrar tu cuenta </v-card-title>

          <v-card-subtitle class="hidden-sm-and-down text-h5 mx-10 ">Cierra tu cuenta permanentemente.</v-card-subtitle>

          <v-card-actions class="text-h5 mx-5">
          
            <v-btn class="mx-10" x-large color="black" dark @click.stop="dialog=true">
                  <v-icon left> mdi-delete </v-icon>
                  Cerrar cuenta
                </v-btn>

                <v-dialog v-model="dialog" max-width="250">
                  <v-card class="r">
                    <v-card-title class="text-h5">
                      Estás segur@ ? 
                    </v-card-title>

                    <v-card-actions >
                      <v-spacer></v-spacer>
          
                      <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                      >
                        Cancelar
                      </v-btn>

                      <v-btn
                        color="green darken-1"
                        text
                        @click="cerrarCuenta()"
                      >
                        Eliminar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>


            <!-- --------------------fin cerrar cuenta ------------ -->
          </v-card-actions>

        </v-card> 
      </v-tab-item>

    </v-tabs>

       <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ textSnackbar}}

            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                Cerrar
              </v-btn>
            </template>
          </v-snackbar>


  </v-card>

  
</template>

<script>
import { getUser, deleteUser ,updateUser } from "../controllers/User.controller";

import EditorPerfil from "../components/EditorPerfil.vue";

export default {
  name: "perfil",
  components: { EditorPerfil },

  data() {
    return {

      snackbar:false ,
      textSnackbar:"" ,
      dialog: false,
      // datos perfil usario
      username: "",


      valid: false,
      passwordOld: "", // la que se trae de la base de datos.
      passwordOldDigitada:"",
      password: "",
      repeatPassword: "",
      showPassword: false,

      userType: "",
      name: "",
      lastname: "",
      email: "",
      cellphone: "",
      documento: "",
      registrationDate: "",

      passwordRules: [
      (v) => !!v || "Required",
      (v) => v.length >= 4 || "La contraseña debe tener más de 4 carácteres",
    ],

    };
  },

  created() {
    const id = sessionStorage.getItem("idUser");
    if (id != undefined) {
      getUser(id)
        .then((response) => {
          const user = response.data;
          (this.username = user.username),
            (this.passwordOld = user.password),
            (this.userType = user.userType),
            (this.name = user.name),
            (this.lastname = user.lastname),
            (this.email = user.email),
            (this.cellphone = user.cellphone),
            (this.documento = user.documento),
            (this.registrationDate = user.registrationDate);
        })
        .catch((err) => console.error(err));
    }
  },

  methods: {

    cerrarCuenta() {
      deleteUser(sessionStorage.getItem("idUser")) // borrar definitamente usuario de MongoDB :(
        .then(() => {
          console.log("Eliminado de forma definitivamente.");

          // cerrar sesión y recargar página
          sessionStorage.clear(); // limpiar "historial" cierra permisos a ciertas páginas.
          this.$router.push("/"); // ir a página d einicio
          window.location.reload(); // recargar página
        })
        .catch((err) => console.error(err));
    },

    changePassword() {
          if(this.valid) {
            const user = {
                password: this.password
            }

              updateUser( sessionStorage.getItem("idUser") ,  user)
            .then(() => {
              // desplejar mensaje de notificación
              // console.log("actualizado");
              this.textSnackbar="Contraseña cambiada."
              this.snackbar = true
               
            })
            .catch((err) => console.error(err));
          }
    }

    
  },
};
</script>

<style></style>
