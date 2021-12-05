<template>
  <v-div class="contenedor">
    <div class="recibo">
      <div class="imagen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-receipt-2"
          width="56"
          height="56"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#000000"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2"
          />
          <path
            d="M14 8h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5m2 0v1.5m0 -9v1.5"
          />
        </svg>
      </div>
      <h1 class="recibo__title">RECIBO</h1>
      <div class="recibo__campo">
        <p>Nombre</p>
        <p>{{ lastNameCliente }}, {{ nameCliente }}</p>
      </div>
      <div class="recibo__campo">
        <p>Lugar de recogida</p>
        <p></p>
        <p>{{ lugarRecogida }}</p>
      </div>

      <div class="recibo__campo">
        <p>Fecha de recogida</p>
        <p>{{ fechaRecogida }}</p>
      </div>

      <div class="recibo__campo">
        <p>Lugar de entrega</p>
        <p>{{ lugarDevolucion }}</p>
      </div>

      <div class="recibo__campo">
        <p>Fecha de entrega</p>
        <p>{{ fechaEntrega }}</p>
      </div>

      <div class="recibo__campo">
        <p>Vehículo</p>
        <p>{{ modeloCarro }}</p>
      </div>

      <div class="precios">
        <div class="precio-contenido">
          <p>Días totales de alquiler</p>
          <p>{{ diasAlquiler }}</p>
        </div>

        <div class="precio-contenido">
          <p>Precio por día del carro</p>
          <p>{{ precioCarro }} COP</p>
        </div>
      </div>

      <div class="recibo__campo">
        <p class="total-texto">TOTAL</p>
        <p>{{ totalPagar }} COP</p>
      </div>
    </div>

    <!-- botón para registrar recibo en base de datos -->
    <div class="botones">
      <v-btn
        class="boton"
        @click="registrarReciboBaseDatos()"
        color="primary"
        depressed
        elevation="4"
        outlined
        rounded
        text
        >RESERVAR</v-btn
      >
      <v-btn
        class="boton"
        to="/alquiler"
        color="primary"
        depressed
        elevation="4"
        outlined
        rounded
        text
        >VOLVER</v-btn
      >

      
      <!-- mensaje de notificación -->
       <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ textSnackbar}}

            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="regresarHome()">
                Cerrar
              </v-btn>
            </template>
      </v-snackbar>
      <!-- fin  mensaje de notificación -->


    </div>
  </v-div>
</template>

<script>
import { createRecibo } from "../../controllers/Recibo.controller"; //  controlador para crear recibo.
import {  updateCar } from "../../controllers/Car.controller";  // para actualizar stock del carro al finalizar reserva.

export default {
  data() {
    return {
      // datos del cliente
      nameCliente: sessionStorage.getItem("nameCliente"),
      lastNameCliente: sessionStorage.getItem("lastNameCliente"),
      documento: sessionStorage.getItem("documento"),
      // datos de la reserva
      lugarRecogida: sessionStorage.getItem("lugarRecogida"),
      fechaRecogida: sessionStorage.getItem("fechaRecogida"),
      lugarDevolucion: sessionStorage.getItem("lugarDevolucion"),
      fechaEntrega: sessionStorage.getItem("fechaEntrega"),
      modeloCarro: sessionStorage.getItem("modeloCarro"),
      diasAlquiler: sessionStorage.getItem("diasAlquiler"),
      precioCarro: sessionStorage.getItem("precioDiaCarro"),
      totalPagar:
        sessionStorage.getItem("diasAlquiler") *
        sessionStorage.getItem("precioDiaCarro"),

      stock: sessionStorage.getItem("stock") ,

      // notificación
       snackbar: false,
        textSnackbar: "",
        // timeout: 8000,
    };
  },

  // registrar en base de datos

  methods: 

  {
    regresarHome() {  // sólo se activa si se ha presionado botón de reserva.
        this.$router.push("/");   
    } ,

    registrarReciboBaseDatos() {
      this.textSnackbar ="Reserva exitosa.";
      this.snackbar = true;

      //-------*** Agregar a la base de datos ***-----------------------
      // crear molde/objeto a guardar.
      const recibo = {
        nameCliente: this.nameCliente,
        lastNameCliente: this.lastNameCliente,
        documento: this.documento,
        lugarRecogida: this.lugarRecogida,
        fechaRecogida: this.fechaRecogida,
        lugarDevolucion: this.lugarDevolucion,
        fechaEntrega: this.fechaEntrega,
        diasAlquiler: this.diasAlquiler,
        modeloCarro: this.modeloCarro,
        totalPagar: this.totalPagar,
      };

      // crear usuario si se puede de lo contrario:
      createRecibo(recibo)
        .then(() => {
          console.log("Recibo creado con éxito en la base de datos.");
        })
        .catch((err) => console.error(err));

      // -------------Actualizar stock carro -----------
       const car = {
          stock: this.stock - 1,
       };
      const idCarro = sessionStorage.getItem("_id_carro_elegido");
      updateCar(idCarro, car)
          .then(() => {
              console.log("Stock disminuido.")
          })
          .catch((err) => console.error(err));
      // --------fin  actualizar stock carro -----------
    },
  },
};
</script>



<style scoped>
.contenedor {
  display: block;
  max-width: 560px;
  margin: 0 auto;
  box-shadow: 6px 6px 27px -18px rgba(28, 28, 28, 1);
  border-radius: 1rem;
  background-color: rgb(240, 240, 240);
}
.recibo {
  padding: 2rem;
}

.imagen {
  text-align: center;
}

.recibo__title {
  text-align: center;
  font-family: sans-serif;
  margin-bottom: 2.8rem;
  font-style: italic;
}

.recibo__campo {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.8rem;
  padding: 0.8rem;
  border-bottom: 2px solid rgb(185, 185, 185);
  transition: 0.8s all;
}

.recibo__campo:hover {
  border-bottom: 2px solid #000;
}

.recibo__campo p {
  margin: 0;
}

.recibo__campo p:first-child {
  font-weight: bold;
}

.recibo__campo:last-of-type {
  margin-top: 4rem;
}

.precios {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 3rem;
}

.precio-contenido {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.precio-contenido p:first-child {
  font-weight: bold;
}

.total-texto {
  font-size: 1.5rem;
}

.botones {
  padding: 0 2rem 2rem 2rem;
  display: flex;
  justify-content: space-evenly;
}
.boton {
  background-color: white;
}
</style>