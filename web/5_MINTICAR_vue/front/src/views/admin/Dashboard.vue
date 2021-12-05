<template>
  <div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-around rounded-lg">
      <h3>Dashboard</h3>
      <v-btn to="/admin/gestionrecibos" color="success"> Ver reservas </v-btn>
      <v-btn
        class="hidden-sm-and-down"
        to="/admin/gestionusuarios"
        color="success"
      >
        Ver usuarios
      </v-btn>
      <v-btn
        class="hidden-sm-and-down"
        to="/admin/gestioncatalogo"
        color="success"
      >
        Ver catálogo
      </v-btn>
    </v-subheader>
    <br />
    <v-row>
      <v-col lg="12" cols="12">
        <v-alert dense text type="success">
          Bienvenido <strong>{{ nombreCompletoAdmin }}</strong>
        </v-alert>
      </v-col>
    </v-row>

    <v-row>
      <!-- <v-col lg="12" cols="12"> -->

        <v-col lg="6" cols="12">
          <v-card elevation="2" class="rounded-lg">
            <v-card-text class="d-flex flex-wrap justify-space-around  align-center">

              <div class="d-flex align-center justify-center">
              <div class="mx-5 my-10"><strong>Clientes registrados</strong> <br /></div>
              <v-avatar
                size="60"
                color="blue-grey darken-1"
                style="border: 3px solid #444"
              >
                <span style="color: white">{{ numClientes }} +</span>
              </v-avatar>
              </div>

              <div class="d-flex align-center">
              <div class="mx-5 my-10"><strong>Admins</strong> <br /></div>
              <v-avatar
                size="60"
                color="blue-grey darken-1"
                style="border: 3px solid #444"
              >
                <span style="color: white">{{ numAdmin }} +</span>
              </v-avatar>
              </div>

            </v-card-text>
            <v-card-actions class="d-flex justify-space-between">
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col lg="6" cols="12">
          <v-card elevation="2" class="rounded-lg">
            <v-card-text
              class="d-flex flex-wrap justify-space-around  align-center"
            >
              <div class="d-flex align-center justify-center">
              <div class="mx-5 my-10"><strong>Carros Parqueados</strong> <br /></div>
              <v-avatar
                size="60"
                color="blue-grey darken-1"
                style="border: 3px solid #444"
              >
                <span style="color: white">{{ numStock }} +</span>
              </v-avatar>
              </div>
              <div class="d-flex align-center justify-center">
              <div class="mx-5 my-10"><strong>Agotados</strong> <br /></div>
              <v-avatar size="60" color="red" style="border: 3px solid #444">
                <span style="color: white">{{ numCarrosAgotados }} +</span>
              </v-avatar>
              </div>
            </v-card-text>
            <v-card-actions class="d-flex justify-space-between">
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col lg="6" cols="12">
          <v-card elevation="2" class="rounded-lg">
            <v-card-text
              class="d-flex flex-wrap justify-space-between align-center"
            >
              <div class="d-flex align-center">
              <div class="mx-5"><strong>Recibos</strong> <br /></div>
              <v-avatar
                size="60"
                color="blue-grey darken-1"
                style="border: 3px solid #444"
              >
                <span style="color: white">{{ numRecibos }} +</span>
              </v-avatar>
              </div>

              <div class="d-flex align-center">
              <div class="mx-5 my-10"><strong>Cobrados</strong> <br /></div>
              <v-avatar size="60" color="green" style="border: 3px solid #444">
                <span style="color: white">{{ numRecibosCobrados }} +</span>
              </v-avatar>
               </div>
              
              <div class="d-flex align-center">
              <div class="mx-5"><strong>Pendientes</strong> <br /></div>
              <v-avatar size="60" color="red" style="border: 3px solid #444">
                <span style="color: white">{{ numRecibosPendientes }} +</span>
              </v-avatar>
               </div>

            </v-card-text>
            <v-card-actions class="d-flex justify-space-between">
            </v-card-actions>
          </v-card>
        </v-col>

            <v-col lg="6" cols="12">
          <v-card elevation="2" class="rounded-lg">
            <v-card-text
              class="d-flex flex-wrap justify-space-around  align-center"
            > 
              <div class="d-flex align-center">
              <div class="mx-5 my-10"><strong>PQRS</strong> <br /></div>
              <v-avatar
                size="60"
                color="blue-grey darken-1"
                style="border: 3px solid #444"
              >
                <span style="color: white">{{ numPqrs }} +</span>
              </v-avatar>
              </div>

              <div class="d-flex align-center">
              <div class="mx-5 my-10"><strong>Sin leer</strong> <br /></div>
              <v-avatar size="60" color="red" style="border: 3px solid #444">
                <span style="color: white">{{ numPqrsSinLeer }} +</span>
              </v-avatar>
              </div>
              
        

            </v-card-text>
            <v-card-actions class="d-flex justify-space-between">
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col lg="12" cols="12">
          <v-card elevation="2" class="rounded-lg">
            <v-alert
              border="bottom"
              colored-border
              type="warning"
              elevation="2"
            >
              <v-card-text
                class="d-flex flex-wrap justify-center align-center"
              >
                <div><strong>Total </strong> <br /></div>

                <v-chip class="ma-2 px-5" color="orange" text-color="white">
                  <strong>{{ DineroCobrado }} </strong>
                  <v-icon right> mdi-currency-usd </v-icon>
                </v-chip>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between">
              </v-card-actions>
            </v-alert>
          </v-card>
        </v-col>
      <!-- </v-col> -->

      <v-col cols="12" lg="6">
        <pqrsTable />
      </v-col>

      <v-col cols="12" lg="6">
        <faqTable />
      </v-col>
    </v-row>
  </div>
</template>

<script>

import pqrsTable from "../../components/pqrsCRUD.vue"; // tabla para CRUD pqrs
import faqTable from "../../components/faqCRUD.vue"; // tabla para CRUD faq

import { getAllUsers } from "../../controllers/User.controller"; // cargar de la biblioteca la función necesaria para pedir algo al backend.
import { getAllCars } from "../../controllers/Car.controller"; // cargar de la biblioteca la función necesaria para pedir algo al backend.
import { getAllRecibos } from "../../controllers/Recibo.controller"; // cargar recibos
import { getAllPqrs } from "../../controllers/Pqrs.controller"; // cargar pqrs

export default {
  name: "Dashboard",
  components: { pqrsTable, faqTable },

  data() {
    return {
      users: [],
      cars: [],
      recibos: [],
      pqrs:[]
    };
  },

  created() {
    getAllUsers() // llamar a la función
      .then((response) => {
        // cuando lleguen los prometo hacer:
        // console.log(response.data); // qué llega ?
        // console.log(response.data.length);
        this.users = response.data;
      })
      .catch((err) => console.error(err)); //manejar errores

    // getAllCars(); // llamar a la función
    getAllCars() // llamar a la función
      .then((response) => {
        // cuando lleguen los prometo hacer:

        this.cars = response.data;
      })
      .catch((err) => console.error(err)); //manejar errores

    // getAllRecibos(); // llamar a la función
    getAllRecibos() // llamar a la función
      .then((response) => {
        // cuando lleguen los prometo hacer:

        this.recibos = response.data;
      })
      .catch((err) => console.error(err)); //manejar errores
    
      getAllPqrs() // llamar a la función
      .then((response) => {
        // cuando lleguen los prometo hacer:

        this.pqrs = response.data;
      })
      .catch((err) => console.error(err)); //manejar errores
  },

  computed: {
    nombreCompletoAdmin() {
      return (
        sessionStorage.getItem("nameCliente") +
        " " +
        sessionStorage.getItem("lastNameCliente")
      );
    },

    numClientes() {
      return this.users.filter((user) => user.userType === "client").length;
    },

    numAdmin() {
      return this.users.filter((user) => user.userType === "admin").length;
    },

    numStock() {
      let conteo = 0;
      this.cars.forEach((car) => {
        conteo = conteo + car.stock;
      });
      return conteo;
    },

    numCarrosAgotados() {
      return this.cars.filter((car) => car.estado === "agotado").length;
    },

    numRecibos() {
      return this.recibos.length;
    },

    numRecibosPendientes() {
      return this.recibos.filter((recibo) => recibo.estado === "pendiente")
        .length;
    },

    numRecibosCobrados() {
      return this.recibos.filter((recibo) => recibo.estado === "cobrado").length;
    },

    DineroCobrado() {
      let caja = 0;
      this.recibos.forEach((recibo) => {
        if (recibo.estado === "cobrado") {
          caja += recibo.totalPagar;
        }
      });
      return caja;
    },

    numPqrs() {
      return this.pqrs.length;
    } ,

    numPqrsSinLeer() {
      return this.pqrs.filter((recibo) => recibo.estado === "NL").length;
    }
  },

  methods: {
   
  },
};
</script>

<style scoped>
.overlap-icon {
  position: absolute;
  top: -33px;
  text-align: center;
  padding-top: 12px;
}
</style>
