<template>
  <v-container fluid>
    <h1>
      Preguntas frecuentes 
    </h1>

    <v-expansion-panels class="mb-6" v-for="item in preguntas" :key="item._id">

        <v-expansion-panel>
        <v-expansion-panel-header expand-icon="mdi-menu-down">
          <h3>
            {{item.pregunta}}
          </h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
           {{item.respuesta}}
        </v-expansion-panel-content>

      </v-expansion-panel>

      <!-- <v-expansion-panel>
        <v-expansion-panel-header expand-icon="mdi-menu-down">
          <h3>
            1. ¿Qué tipos de licencia de conducción son válidos para alquilar un automóvil en
            MINTICAR?
          </h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Una licencia de conducir colombiana será requerida, mínimo categoría
          B2. Las licencias de conducir provisionales (o de aprendizaje) no son
          aceptadas para el alquiler. <br />Para el caso de ciudadanos
          extranjeros, los requisitos dependerán del país de donde el visitante
          provenga. <br />En cualquier caso, cualquier persona que se encuentre
          en el territorio nacional colombiano por un término superior a seis
          meses, deberá contar con una licencia de conducir expedida en Colombia
          por un organismo de tránsito competente.
        </v-expansion-panel-content>
      </v-expansion-panel> -->

   </v-expansion-panels>
     
  </v-container>
</template>

<script>
import {getAllFaq } from "../controllers/Faq.controller"; // cargar de la biblioteca la función necesaria para pedir algo al backend.
export default {
  data() {
    return  {
      preguntas: [
        // { 
        // pregunta:"pregunta1",
        // descripcion:"respuesta1"
        // } ,
        //  { 
        // pregunta:"pregunta2",
        // descripcion:"respuesta2"
        // } ,
       
      ]
     
    }
  }  ,


  // cargar datos de la base de datos(MongoDb)
  created() {
    getAllFaq () // llamar a la función
      .then((response) => {

        this.preguntas = response.data;
      })
      .catch((err) => console.error(err)); //manejar errores
  },

};
</script>

<style></style>
