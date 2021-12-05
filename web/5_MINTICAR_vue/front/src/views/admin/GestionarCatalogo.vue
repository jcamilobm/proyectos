<template>
  <div>
    <h1>Gestión del Catálogo</h1>

    <v-container>
      <!-- contenedor filtro de búsqueda y de rango precios -->
      <v-row>
        <!-- filtro de búsqueda -->
        <v-col cols="12" lg="5" class="d-flex align-center">
          <!-- botón de busqueda /filtro para el catálogo-->
          <v-text-field label="Busqueda" v-model="busqueda">
            <v-icon slot="append" color="red"> mdi-magnify </v-icon>
          </v-text-field>

          <!-- filtro con opciones -->
        </v-col>

        <v-col cols="1" class="d-flex align-center justify-end">
          <v-icon>mdi-currency-usd</v-icon>
        </v-col>

        <!-- filtro de rango de precios -->
        <v-col cols="12" lg="6">
          <v-container fluid>
            <v-card flat color="transparent">
              <!-- <v-subheader>Rango de precios</v-subheader> -->

              <v-card-text>
                <v-row>
                  <v-col class="px-4">
                    <v-range-slider
                      v-model="range"
                      :max="precioMax"
                      :min="precioMin"
                      hide-details
                      class="align-center"
                      step="10000"
                    >
                      <template v-slot:prepend>
                        <v-text-field
                          :value="range[0]"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 70px"
                          @change="$set(range, 0, $event)"
                        ></v-text-field>
                      </template>
                      <template v-slot:append>
                        <v-text-field
                          :value="range[1]"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 75px"
                          @change="$set(range, 1, $event)"
                        ></v-text-field>
                      </template>
                    </v-range-slider>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
    </v-container>

    <!-- fin filtros  -->

    <!-- inicio grid cards -->
    <v-container>
      <!-- botón flotante para agregar  carro -->
      <v-btn
        elevation="2"
        bottom
        right
        fixed
        fab
        to="/admin/gestioncatalogo/agregarcarro"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <!-- fin botón flotante para agregar  -->

      <!-- inicio grid carros -->
      <v-row>
        <v-col
          v-for="(car, i) in filtrarCarros"
          :key="car.code"
          sm="6"
          md="4"
          lg="3"
          xs="12"
        >
          <!-- -----------------TARJETA CARRO ---------------------------------------->
          <v-card class="mx-auto my-12" max-width="400px">
            <!-- <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template> -->

            <v-img
              class="blue--text align-end"
              height="150px"
              :src="car.img"
            ></v-img>

            <v-divider inset></v-divider>

            <v-card-title class="d-flex justify-center">{{
              car.name
            }}</v-card-title>
            <v-card-text class="d-flex justify-center">
              <v-chip class="ma-2" color="orange" text-color="white">
                <strong> $ {{ car.price }} </strong>  / DIA 
              </v-chip>

              <!-- <div class="my-2 text-subtitle-1">$ • CADA DIA</div> -->

              <!-- <div>
                Small plates, salads & sandwiches - an intimate setting with 12
                indoor seats plus patio seating.
              </div> -->
            </v-card-text>

            <v-divider class="mx-4"></v-divider>
            <v-card-title class="d-flex justify-center">Stock: {{car.stock}}</v-card-title> 

            <!-- ocultar/mostrar -->
            <v-card-actions>
              <v-btn color="orange lighten-2" text> Explorar </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="car.showInfo = !car.showInfo">
                <v-icon>{{
                  car.showInfo  ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="car.showInfo">
                <v-divider></v-divider>

                <v-card-text>
                  <v-chip class="mr-2 mb-2" >
                    <v-icon left> mdi-engine </v-icon>
                    {{ car.tipo }}
                  </v-chip>
                  <v-chip class="mr-2 mb-2" >
                    <v-icon left> mdi-briefcase </v-icon>
                    Maletas: {{ car.numeroMaletas }}
                  </v-chip>
                  <v-chip class="mr-2 mb-2" >
                    <v-icon left> mdi-account-settings </v-icon>
                    Personas: {{ car.numeroPersonas }}
                  </v-chip>
                  <v-chip class="mr-2 mb-2" >
                    <v-icon left> mdi-air-conditioner </v-icon>
                    Aire : {{ car.aire }}
                  </v-chip>
                </v-card-text>
              </div>
            </v-expand-transition>

            <!-- fin ocultar -->

            <!-- botones de edición y eliminación -->

            <v-card-actions class="d-flex justify-center">
              <!-- -------------botón para editar-------------------------- -->
              <v-btn color="success" dark @click="editar(car._id)">
                <v-icon left> mdi-pencil </v-icon>
                Editar
              </v-btn>

              <!----------- dialogo para eliminar car -------------------->

              <v-row justify="center">
                <v-btn color="red" dark @click.stop="eliminar(car._id, i)">
                  <v-icon left> mdi-delete </v-icon>
                  Eliminar
                </v-btn>

                <v-dialog v-model="dialog" max-width="250">
                  <v-card class="r">
                    <v-card-title class="text-h5">
                      Estás seguro ? 
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
                        @click="confirmarEliminacion()"
                      >
                        Eliminar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <!----------- FIN dialogo para eliminar carro -------------------->

            </v-card-actions>

            <!-- FIN botones de edición y eliminación -->
          </v-card>
          <!-- fin tarjeta carro -->
        </v-col>
      </v-row>
    </v-container>
    <!-- fin  grid cards -->
  </div>
</template>

<script>
import { getAllCars } from "../../controllers/Car.controller"; // cargar de la biblioteca la función necesaria para pedir algo al backend.
import { deleteCar } from "../../controllers/Car.controller"; // borrar un carro en base al id generado automaticamente por MongoDB

export default {
  data() {
    return {
      // variables para proceso de eliminación
      dialog: false, // diálogo para eliminar carro del catálogo.
      id_temporal:"",
      i_temporal:"",
      // fin variables para proceso de eliminación

      busqueda: "",

      // variables para el filtro de precio
      precioMin: 10000,
      precioMax: 200000,
      range: [100000, 200000],
      // fin variables para el  filtro de precio

      /* active: true, */
      cars: [
        // {
        //   code: 1,
        //   showInfo: false,
        //   name: "Nisan Versa",
        //   price: 140000,
        //   tipo: "Automático",
        //   numeroMaletas: 5,
        //   numeroPersonas: 5,
        //   aire: "sí",
        //   img: "https://conceptodefinicion.de/wp-content/uploads/2015/10/Automovil.jpg",
        //   stock: 2 por default
        // },
      ],
    };
  },

  // cargar datos de la base de datos(MongoDb)
  created() {
    getAllCars() // llamar a la función
      .then((response) => {
        // cuando lleguen los prometo hacer:
        console.log(response.data); // qué llega ?
        this.cars = response.data;
      })
      .catch((err) => console.error(err)); //manejar errores
  },

  methods: {

    //------- Inicio Eliminar un único carro basado en _id generado por MongoDB-------------------------

        eliminar(_id, i) {
          this.dialog = true;
          this.id_temporal = _id;  // _id es para eliminar en base de datos, i es para eliminar localmente y que no haya necesidad de recargar página para ver eliminación real.
          this.i_temporal = i;
        } ,
        confirmarEliminacion() {
          this.dialog = false; // cerrar notificación

          // console.log(`eliminar carro ${this.id_temporal}`);
          deleteCar( this.id_temporal) // borrar definitamente de la de datos :(
            .then(() => {
              // console.log(`carro ${_id} eliminado`);
              this.cars.splice( this.i_temporal , 1); // para simular elimianción y que no haya necesidad de recargar página también se borra de manera local.
              // window.location.reload()  // para recargar página
            })
            .catch((err) => console.error(err) );
          },
    //------- FIN eliminar un único carro basado en _id generado por MongoDB-------------------------

      editar(id) {
        this.$router.push(`/cars/${id}`)
      }
  },

  computed: {
    // filtro
    filtrarCarros() {
      //retorna nueva matriz de datos en base a unos test
      return this.cars.filter((car) => {
        return (
          car.price >= this.range[0] &&
          car.price <= this.range[1] &&
          car.name.toLowerCase().includes(this.busqueda)
        );
      });
    },
  },
};
</script>

<style>
</style>