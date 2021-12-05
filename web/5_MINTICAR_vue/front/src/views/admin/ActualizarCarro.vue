<template>
  <v-container fluid>
    <!-- INICIO botón flotante para regresar a gestión de catálogo -->
    <v-btn elevation="2" bottom right fixed fab to="/admin/gestioncatalogo">
      <v-icon>mdi-arrow-left-bold</v-icon>
    </v-btn>
    <!-- FIN botón flotante para regresar a gestión de catálogo -->

    <!--INICIO FORMULARIO PARA AGREGAR CARRO-->
    <v-form ref="form">
      <!-- marca  -->
      <v-row>
        <!--  título del formulario -->
        <v-col cols="12">
          <h1>Nuevo producto</h1>
        </v-col>

        <!-- agregar imagen -->
        <v-col cols="12">
          <v-img max-height="300" :src="img"></v-img>
          <v-text-field
            placeholder="URL de la imagen"
            :rules="rulesimg"
            v-model="img"
          >
            <v-icon slot="prepend"> mdi-image </v-icon>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex" cols="12" sm="4">
          <v-icon class="mx-1">mdi-barcode</v-icon>
          <v-text-field
            v-model="code"
            label="Código"
            :rules="rulesPrice"
            :disabled="true"
          ></v-text-field>
        </v-col>

        <v-col class="d-flex" cols="12" sm="4">
          <v-icon class="mx-1">mdi-car</v-icon>
          <v-text-field
            v-model="name"
            :rules="rulesName"
            label="Modelo"
          ></v-text-field>
        </v-col>

        <!--  precio por día -->
        <v-col class="d-flex" cols="12" sm="4">
          <v-icon class="mx-1">mdi-currency-usd</v-icon>
          <v-text-field
            v-model="price"
            :rules="rulesPrice"
            label="Precio por dia"
            step="10000"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- detalles del carro -->
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="4">
          <v-icon class="mx-1">mdi-briefcase</v-icon>
          <v-text-field
            v-model="numeroMaletas"
            label="Número de maletas ?"
            :rules="rulesMaletas"
          ></v-text-field>
        </v-col>

        <v-col class="d-flex" cols="12" sm="4">
          <v-icon left> mdi-account-settings </v-icon>
          <v-text-field
            v-model="numeroPersonas"
            label="Número de personas ?"
            :rules="rulesPersonas"
          ></v-text-field>
        </v-col>

        <v-col class="d-flex" cols="12" sm="4">
          <v-icon left> mdi-air-conditioner </v-icon>
          <v-select
            v-model="aire"
            :items="opcionesAire"
            label="aire acondicionado ?"
            :rules="rulesAire"
          ></v-select>
        </v-col>

        <v-col class="d-flex" cols="12" sm="6" lg="6">
          <v-icon class="mx-1"> mdi-engine</v-icon>
          <v-select
            v-model="tipo"
            :items="opcionesTipos"
            label="Es mecánico o automático?"
            :rules="rulesTipo"
          ></v-select>

          <v-col class="d-flex" cols="12" sm="6" lg="6">
            <v-icon class="mx-1">mdi-briefcase</v-icon>
            <v-text-field
              v-model="stock"
              label="Stock "
              :rules="rulesMaletas"
            ></v-text-field>
          </v-col>
        </v-col>
      </v-row>

      <!-- INICIO botones para enviar y limpiar campos -->
      <div class="d-flex justify-center mt-3">
        <!-- botón para guardar y despliegue de aviso -->
        <div class="d-flex justify-center text-center">
          <v-btn color="success" class="mr-4" @click="actualizar()">
            Actualizar
          </v-btn>

          <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ textSnackbar }}

            <template v-slot:action="{ attrs }">
              <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="regresarCatalogo()"
              >
                Cerrar
              </v-btn>
            </template>
          </v-snackbar>
        </div>

        <!-- fin boton para guardar y despliegue de aviso -->

        <!-- <v-btn @click="guardar" color="success" class="mr-4"> Guardar </v-btn> -->
        <!-- <v-btn @click="limpiar" color="error"> Limpiar </v-btn> -->
      </div>

      <!-- FIN botones para enviar y limpiar campos -->
    </v-form>
  </v-container>
</template>
 

<script>
import { getCar, updateCar } from "../../controllers/Car.controller";

export default {
  data() {
    return {
      /* DATOS */
      code: "",
      img: "",
      name: "",
      price: "",
      numeroMaletas: "",
      numeroPersonas: "",
      tipo: "",
      aire: "",
      id: "", //dado por Mongo
      showInfo: false, //bandera para ocultar datos en tarjeta del carro
      stock: "",

      select: null,
      opcionesTipos: ["Mecánico", "Automático"],
      opcionesAire: ["Sí", "No"],

      /* REGLAS */

      rulesimg: [(value) => !!value || "Requerido"],
      rulesName: [
        (value) => !!value || "Requerido",
        (v) =>
          (v && v.length <= 15) || "El nombre debe tener menos de 16 letras",
      ],
      rulesPrice: [
        (value) => !!value || "Requerido",
        (v) =>
          Number.isInteger(Math.floor(Number(v))) || "Debe ingresar un nùmero",
        // (v) =>  (v && v.length <= 9) || "El precio debe tener menos de 10 digitos",
      ],
      rulesTipo: [(value) => !!value || "Requerido"],
      rulesMaletas: [
        (value) => !!value || "Requerido",
        (v) => Number.isInteger(Number(v)) || "Debe ingresar un número entero",
        // (v) =>  (v && v.length < 2) || "Número máximo de maletas: 9",
      ],
      rulesPersonas: [
        (value) => !!value || "Requerido",
        (v) => Number.isInteger(Number(v)) || "Debe ingresar un número entero",
        // (v) =>  (v && v.length < 2) || "Número máximo de personas: 9",
      ],
      rulesAire: [(value) => !!value || "Requerido"],

      //   datos para el  aviso que se despliega al guardar exitosamente.
      snackbar: false,
      textSnackbar: "",
      timeout: 2200,
    };
  },

  created() {
    const id = this.$route.params.id;
    if (id != undefined) {
      getCar(id)
        .then((response) => {
          const car = response.data;
          (this.id = car._id),
            (this.code = car.code),
            (this.name = car.name),
            (this.price = car.price),
            (this.tipo = car.tipo),
            (this.numeroMaletas = car.numeroMaletas),
            (this.numeroPersonas = car.numeroPersonas),
            (this.aire = car.aire),
            (this.img = car.img),
            (this.stock = car.stock);
        })
        .catch((err) => console.error(err));
    }
  },

  methods: {
    limpiar() {
      this.$refs.form.reset();
    },

    regresarCatalogo() {
      if (this.$refs.form.validate()) {
        this.$router.push("/admin/gestioncatalogo");
      } else {
        this.snackbar = false;
      }
    },

    actualizar() {
      // validar formulario
      console.log("actualizar");
      if (this.$refs.form.validate()) {
        //-------*** Agregar a la base de datos ***-----------------------
        // crear molde/objeto a guardar.
        const car = {
          id: this.id,
          code: this.code,
          name: this.name,
          price: this.price,
          tipo: this.tipo,
          numeroMaletas: this.numeroMaletas,
          numeroPersonas: this.numeroPersonas,
          aire: this.aire,
          img: this.img,
          stock: this.stock,
        };

        // actualizar carro si se puede de lo contrario:
        updateCar(car.id, car)
          .then(() => {
            // desplejar mensaje de notificación
            this.textSnackbar = "Producto actualizado con éxito.";
            this.snackbar = true; //para desplegar aviso de que se agrego el producto al catàlogo.
          })
          .catch((err) => console.error(err));
      } else {
        // si no se lleno correctamente los campos del formulario:
        this.textSnackbar =
          "Llena los campos correctamente para poder actualizar.";
        this.snackbar = true; //para desplegar aviso de que hay algo que corregir.
      }

      // ----- FIN proceso actualizar a la base de datos
    },
  },
};
</script>

<style>
</style>