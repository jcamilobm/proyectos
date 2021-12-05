<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Autenticación</h1>
    </v-card-title>
    <v-card-text>
      <v-text-field
        label="Usuario"
        prepend-icon="mdi-account-circle"
        v-model="username"
      />
      <v-text-field
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        label="Contraseña"
        prepend-icon="mdi-lock"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
      />
    </v-card-text>
    <v-divider></v-divider>

    <div class="d-flex justify-space-around">
        <v-card-actions>
          <v-btn color="info" @click="login()">Ingresar</v-btn>
        </v-card-actions>

        <v-card-actions>
          <v-btn color="info" @click=abrirRegistro()>No tienes cuenta ?</v-btn>
        </v-card-actions>
    </div>
      <!-- mensaje de notificación -->
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
import { validateUser } from "../controllers/Login.controller";

export default {
  data() {
    return {
      snackbar:false,
      textSnackbar:"",
      showPassword: false,
      username: "",
      password: "",
    };
  },
  methods: {
    abrirRegistro(){
        this.$emit("login-success", null);
        this.$router.push('/registro')
    } ,

    login() {
      // Tomar email o username y contraseña para verificar si es válido
      // voy al abckend y verifico

      validateUser(this.username, this.password)
        .then((response) => {
          const user = response.data;

          sessionStorage.setItem("idUser", user._id);  // para referenciar usuario en perfil
          // necesario para login y para cargar datos en perfil.
          sessionStorage.setItem("userType", user.userType);
          sessionStorage.setItem("username", user.username);
          sessionStorage.setItem("nameCliente", user.name);
          sessionStorage.setItem("lastNameCliente", user.lastname);
          sessionStorage.setItem("documento", user.documento);
          sessionStorage.setItem("email", user.email);
          sessionStorage.setItem("cellphone", user.cellphone);
          sessionStorage.setItem("tipoDocumento", user.tipoDocumento);

          
           this.$router.push('/')
           this.$emit("login-success", this.username); 
            window.location.reload();
          
           
        })
        .catch((err) => {
          this.showError = true;
          this.error = err.response.data.message;

          // alert(this.error)  Notificación de error 
          this.textSnackbar = this.error 
          this.snackbar = "true";

          setInterval(() => {
            this.showError = false;
          }, 3000);
        });

    },
  },
};
</script>

<style>
</style>