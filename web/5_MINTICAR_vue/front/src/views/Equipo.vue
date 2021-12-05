<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <!--  Inicio tarjetas de equipo-->
        <div>
          <!-- <h2>EQUIPO</h2> -->

          <!-- inicio grid cards -->
          <v-container>
            <v-row>
              <v-col v-for="persona in equipo" :key="persona.id" sm="6" xs="12">
                <v-card>
                  <!-- estilo de card -->
                  <v-card class="mx-auto" outlined>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="text-overline mb-4">
                          <v-list-item-avatar color="grey darken-3">
                            <v-img
                              class="elevation-6"
                              alt="img perfil"
                              :src="persona.icono"
                            ></v-img>
                          </v-list-item-avatar>
                          {{ persona.name }}
                        </div>

                        <v-list-item-title class="text-h5 mb-1">
                          {{ persona.puesto }}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{
                          persona.descripcion
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>

                    <v-card-actions class="justify-end">
                      <v-btn outlined rounded text>
                        <a :href="abrirCorreo" style="text-decoration: none"
                          >Contacto
                        </a>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                  <!-- fin estilo card -->
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <!-- fin  grid cards -->
        </div>

        <!--  fin formulario -->
      </v-col>

      <v-col cols="12" md="6">
        <!--  Inicio hsitoria de la empresa-->
        <h2>Un corto recorrido</h2>
        <v-timeline>
          <v-timeline-item
            v-for="(year, i) in years"
            :key="i"
            :color="year.color"
            small
          >
            <template v-slot:opposite>
              <span
                :class="`headline font-weight-bold ${year.color}--text`"
                v-text="year.year"
              ></span>
            </template>
            <div class="py-4">
              <h2
                :class="`headline font-weight-light mb-4 ${year.color}--text`"
              >
                {{year.titulo}}
              </h2>
              <div>
                {{year.historia}}
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>
        <!--  fin historia de la empresa -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      years: [
        {
          color: "green",
          year: "Segundo trimestre de 2021",
          titulo:"Inicios",
          historia:"Inicia el Ciclo 1 de MisionTIC 2022, con programación en Python."
        },
        {
          color: "pink",
          year: "Tercer trimestre de 2021",
          titulo:"Segunda etapa",
          historia:"Continúa el proyecto MisionTIC 2022 con programación en Java."
        },
        {
          color: "amber",
          year: "Cuarto trimestre de 2021",
          titulo:"Un paso más",
          historia:"Programación web, con múltiples herramientas y trabajo en equipo."
        },
      ],
      equipo: [
        {
          id: 2,
          name: "Juan Camilo Betancourt Monsalve",
          puesto: "Director Técnico",
          descripcion: "Ingeniero apasionado de la programación y la tecnología",
          icono: "https://avataaars.io/?",
          correo: "minticar2022@gmail.com",
        },
        {
          id: 2,
          name: "Julián Andrés Gamarra Gamarra",
          puesto: "Director Financiero",
          descripcion: "Financista profesional con trayectoria internacional",
          icono: "https://avataaars.io/?",
          correo: "minticar2022@gmail.com",
        },
        {
          id: 2,
          name: "John Carlos Guevara Núnez",
          puesto: "Director Comercial",
          descripcion: "Desarrollo de proyectos a gran escala",
          icono: "https://avataaars.io/?",
          correo: "minticar2022@gmail.com",
        },
        {
          id: 2,
          name: "Jaime Alberto Rodríguez Arango",
          puesto: "Relaciones Públicas",
          descripcion: "Contacto con medios de comunicación",
          icono: "https://avataaars.io/?",
          correo: "minticar2022@gmail.com",
        },
      ],
    };
  },
  computed: {
    abrirCorreo() {
      return "mailto:" + this.correo;
    },
  },
};
</script>

<style>
</style>
