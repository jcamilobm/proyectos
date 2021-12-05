<template>
  <v-app class="container">
    <v-icon x-large color="blue">mdi-account-circle</v-icon>
    <h1 class="form-title">Registro</h1>
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

        <!-- ~ CAMPOS USUARIO Y CONTRASEÑA -->
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
              v-model="password"
              :rules="passwordRules"
              :counter="12"
              label="Contraseña"
              required
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="repeatPassword"
              :rules="[
                passwordRules,
                password === repeatPassword || 'Password must match',
              ]"
              :counter="12"
              label="Repetir Contraseña"
              required
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- ~ CAMPO CORREO Y TELEFONO -->
        <v-row class="v-row">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
              append-icon="mdi-email"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
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
          <v-col class="d-flex mt-3" cols="12" sm="6">
            <v-select
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
              v-model.number="documento"
              :rules="numberRules"
              :counter="14"
              label="Número de documento"
              required
              append-icon="mdi-card-account-details"
            ></v-text-field>
          </v-col>

          <v-col class="flex-boton d-flex justify-center ">

              <v-btn  class="mx-2" @click="cancelarregistro()" color="secundary" depressed elevation="4" outlined rounded text
              >Cancelar</v-btn >

              <v-btn class="mx-2"  @click="LimpiarRegistro()" color="secundary" depressed elevation="4" outlined rounded text
              >Limpiar</v-btn >

              
              <v-btn class="mx-2" @click="registrarBaseDatos()" color="primary" depressed elevation="4" outlined rounded text
              >Registrar</v-btn >
         
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
import { createUser } from "../controllers/User.controller";  //  controlador para crear usuario.

export default {
  data: () => ({
    valid: false,
    name: "",
    lastname: "",
    username: "",
    password: "",
    repeatPassword: "",
    showPassword: false,
    email: "",
    cellphone: "",
    tipoDocumento: "",   
    documento: "",
    items: ["C.C", "C.E", "Pasaporte"],
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

      cancelarregistro() {

        // this.snackbar = true;
        // this.$refs.form.reset();
        this.$router.push("/");
        
      },

      LimpiarRegistro() {
          this.$refs.form.reset();
      } ,

      registrarBaseDatos() {

      //  console.log(`es valido ? :${this.valid}`)
        if (this.valid) {  // si es valido el formulario crear usuario en base de datos permanente

                //-------*** Agregar a la base de datos ***-----------------------
          // crear molde/objeto a guardar.
          const user = {
            username: this.username,
            password: this.password ,
            userType: "client" ,        // por defecto la cuenta creada es de client, 
            email :  this.email ,
            cellphone:  this.cellphone ,
            name: this.name ,
            lastname: this.lastname ,
            documento: this.documento ,
            tipoDocumento:this.tipoDocumento
          };

          // crear usuario si se puede de lo contrario:
          createUser(user)
            .then ( () => {

            // console.log("registrado con éxito en la abse de datos.ya puedes loguearte.")
              // this.textSnackbar =" Registro exitoso. Puedes Iniciar sesión."
              // this.snackbar = true;
             
              this.$router.push('/login')
              
                
            } )
            .catch( ( err) => {
              // console.error(err)
               this.textSnackbar = err;
               this.snackbar = true;
            } );

        } else { // de lo contrario notificar para corregir error con un snackbar
              // console.log("corrige erratas en registro.")
              this.textSnackbar =" Corrige tu registro por favor."
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