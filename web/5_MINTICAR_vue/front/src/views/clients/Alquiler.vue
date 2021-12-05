<template>
  <div id="root">

 
    <h2 class="title">Selección de fecha</h2>
    <form action="" class="form-alquiler">
      <!-- Inicio bloque de fechas -->
      <div class="bloqueFechas">
        <!-- ~ Inicio bloque fecha de recogida -->
        <div class="bloqueFechas__datos">
          <h2 class="subtitleFechas">Datos Recogida</h2>
          <v-select
            :items="items"
            label="Lugar de recogida"
            v-model="lugarRecogida"
            dense
            outlined
            required
          ></v-select>
          <v-date-picker
            v-model="fechaRecogida"
            class="mt-4"
            :min="todayDate"
          ></v-date-picker>
        </div>
        <!-- ~ Inicio bloque fecha de entrega -->
        <div class="bloqueFechas__datos">
          <h2 class="subtitleFechas">Datos Entrega</h2>
          <v-select
            :items="items"
            label="Lugar de devolución"
            v-model="lugarDevolucion"
            dense
            outlined
            required
          ></v-select>
          <v-date-picker
            v-model="fechaEntrega"
            class="mt-4"
            :min="fechaRecogida"
          ></v-date-picker>
        </div>
      </div>

      <div class="flex-boton">
        <div>
          <v-btn to="/catalogo" color="primary" depressed elevation="2" outlined rounded text
            >Volver</v-btn>
        </div>
        <div>
          <v-btn
            color="primary"
            depressed
            elevation="2"
            outlined
            rounded
            text
            @click="verRecibo()"
            >Siguiente</v-btn
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
const Swal = require('sweetalert2');

export default {
  data: () => {
    return {
      todayDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      lugarRecogida: "",
      fechaRecogida: "",
      lugarDevolucion: "",
      fechaEntrega: "",

      items: [
        "Medellín - Terminal de Transportes",
        "Medellín - Aeropuerto Internacional",
        "Bogotá - Terminal de Transportes",
        "Bogotá - Aeropuerto Internacional El Dorado",
      ],
    };
  },

  methods: {
    verRecibo() {
      if (this.fechaRecogida === "" || this.fechaEntrega === "" || this.lugarRecogida === "" || this.lugarDevolucion === "") {
        Swal.fire({
          title: "¡Error!",
          text: "Faltan datos, por favor asegúrese de llenar todos los campos",
          icon: "error",
        })
      } else {
        sessionStorage.setItem("lugarRecogida", this.lugarRecogida);
        sessionStorage.setItem("fechaRecogida", this.fechaRecogida);
        sessionStorage.setItem("lugarDevolucion", this.lugarDevolucion);
        sessionStorage.setItem("fechaEntrega", this.fechaEntrega);

        // calcular dias recibo
        let date_1 = new Date(this.fechaRecogida);
        var date_2 = new Date(this.fechaEntrega);
        let day_as_milliseconds = 86400000;
        let diff_in_millisenconds = date_2 - date_1;
        let diasAlquiler = diff_in_millisenconds / day_as_milliseconds;

        sessionStorage.setItem("diasAlquiler", diasAlquiler);

        this.$router.push("/recibo"); // ir a página de recibo
      }
    },
  },
};
</script>

<style scoped>
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}

#root {
  margin: 0 auto;
  margin-top: 40px;
}
.title {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.8rem !important;
}
.form-alquiler {
  margin-top: 30px;
}

.bloqueFechas {
  max-width: 90%;
  margin: 0 auto;
}

.bloqueFechas__datos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 3px 3px 8px -1.5px rgba(0, 0, 0, 0.4);
  padding: 1.4rem;
  border-radius: 1rem;
}

.bloqueFechas__datos:first-child {
  margin-bottom: 2.5rem;
}

.subtitleFechas {
  text-align: center;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .bloqueFechas {
    display: flex;
    justify-content: center;
    gap: 4rem;
  }

  .bloqueFechas__datos {
    max-width: 500px;
    flex-basis: 50%;
  }

  .bloqueFechas__datos:first-child {
    margin: 0;
  }
}

.flex-boton {
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 4rem;
}
</style>