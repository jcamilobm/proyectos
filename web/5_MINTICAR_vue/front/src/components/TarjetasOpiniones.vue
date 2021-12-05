<template>
  <v-container>
    <v-row>
      <v-col v-for="(opinion, i) in opiniones" :key="i" cols="12" sm="6" md="6" >
        <!-- INICIO Molde tarjeta de opiniones -->

        <v-card class="mx-auto my-3" max-width="400"  color="white" >
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-card class="d-flex justify-center" color="indigo darken-1" dark>
            <v-list-item-avatar color="grey darken-3" class="ml-3">
              <v-img
                alt="foto de perfil"
                :src='opinion.url'
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{opinion.name}}</v-list-item-title>
            </v-list-item-content>

            <v-card-title>{{opinion.ciudad}}</v-card-title>
          </v-card>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="opinion.point"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">{{opinion.point}}</div>
            </v-row>

            <div class="my-4">
              {{opinion.comentario}}
            </div>
          </v-card-text>
        </v-card>

        <!-- FIN Molde tarjeta de opiniones -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      opiniones: [
        { name: "Luis Pérez", ciudad: "Bogotá" ,point:4.0,comentario:"Me gustó el servicio, aunque el proceso en medellín inicialmente...",url:"https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"},
        { name: "Daniel Aguirre", ciudad: "Medellín" ,point:4.4,comentario:"Los volveré a contactar.Excelente.",url:"https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"},
        { name: "Sofía Alzate", ciudad: "Bogotá" ,point:4.3,comentario:"Excelente servicio,los carros los entregan limpios...",url:"https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"},
        { name: "Laura Toro", ciudad: "Medellín" ,point:4.3,comentario:"El proceso es ágil y los carros están en buen estado. Bien.",url:"https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"},
      ],
    };
  },
};
</script>

<style>
</style>