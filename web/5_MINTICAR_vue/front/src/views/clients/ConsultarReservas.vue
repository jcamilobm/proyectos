<template>
 
   <!-- inicio grid cards -->
    <v-container>
 
      <v-row>
        <v-col
          v-for="recibo in recibos"
          :key="recibo.id"
          sm="12"
          md="12"
          lg="12"
          xs="12"
        >
          <!-- -----------------RECIBO--------------------------------->
        

        <v-div id="pdf" class="contenedor">
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
                    <p>{{ recibo.lastNameCliente }}, {{ recibo.nameCliente }}</p>
                </div>
                <div class="recibo__campo">
                    <p>Lugar de recogida</p>
                    <p></p>
                    <p>{{ recibo.lugarRecogida }}</p>
                </div>

                <div class="recibo__campo">
                    <p>Fecha de recogida</p>
                    <p>{{ recibo.fechaRecogida }}</p>
                </div>

                <div class="recibo__campo">
                    <p>Lugar de entrega</p>
                    <p>{{ recibo.lugarDevolucion }}</p>
                </div>

                <div class="recibo__campo">
                    <p>Fecha de entrega</p>
                    <p>{{ recibo.fechaEntrega }}</p>
                </div>

                <div class="recibo__campo">
                    <p>Vehículo</p>
                    <p>{{ recibo.modeloCarro }}</p>
                </div>

                <div class="precios">
                    <div class="precio-contenido">
                    <p>Días totales de alquiler</p>
                    <p>{{ recibo.diasAlquiler }}</p>
                    </div>

                    <div class="precio-contenido">
                    <p>Precio por día del carro</p>
                    <p>{{  recibo.totalPagar / recibo.diasAlquiler }} COP</p>
                    </div>
                </div>

                <div class="recibo__campo">
                    <p class="total-texto">TOTAL</p>
                    <p>{{ recibo.totalPagar }} COP</p>
                </div>
                </div>

       
            </v-div>

          <!--  FIN RECIBO  </v-card> -->
        </v-col>

      </v-row>
    </v-container>
    <!-- fin  grid cards -->

</template>

<script>
import { getAllRecibos } from "../../controllers/Recibo.controller"; //  controlador para  llamar recibo.


export default {
name:'revision reservas',
  data() {
    return {
      // datos del cliente
      recibos:[],

      // notificación
      snackbar: false,
      textSnackbar: "",
      // timeout: 8000,
    };
  },

  // cargar datos de la base de datos(MongoDb) del usuario logueado.
  created() {
    getAllRecibos() // llamar a la función
      .then((response) => {
   
        const documento = sessionStorage.getItem("documento");
        this.recibos = response.data.filter( (recibo) => recibo.documento=== documento );
      
      })
      .catch((err) => console.error(err)); //manejar errores
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