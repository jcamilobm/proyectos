<template>
  <v-container fluid>

    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      

      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="descripcion"
      show-expand

    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Gestión de PQRS</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-switch
          v-model="singleExpand"
          label="Exp indiv"
          class="mt-2"
        ></v-switch>

          <v-dialog v-model="dialog" max-width="550px">
        
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-select
                      v-model="editedItem.estado"
                      :items="opcionesEstado"
                    ></v-select>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="550px">
            <v-card>
              <v-card-title class="text-h5"
                >Estás seguro de querer borrar esta PQRS?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Sí</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>


      <!-- colores -->
        <template v-slot:[`item.estado`]="{ item }">
              <v-chip :color="getColor(item.estado)" dark>
                {{ item.estado }}
              </v-chip>
            </template>
        <!-- fin colores -->

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Resetear </v-btn>
      </template>


       <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <strong>Descripción: </strong> {{ item.descripcion}}
      </td>
    </template>
    </v-data-table>

    <!-- notificación  de borrado exitoso-->
    <template>
      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ textSnackbar }}

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
      <!-- fin de notificación -->
    </template>
    
  </v-container>
</template>
 

<script>
import { getAllPqrs , updatePqrs ,  deletePqrs } from "../controllers/Pqrs.controller"; // cargar de la biblioteca la función necesaria para pedir algo al backend.

export default {
  data: () => ({
    //   datos para el  aviso que se despliega al guardar exitosamente.
    snackbar: false,
    textSnackbar: "",
    timeout: 3000,

    expanded: [],
    singleExpand: false,

    select: null,
    opcionesEstado: ["NL", "L"],

    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Tipo", sortable: false, value: "tipo" },
      { text: "Motivo", sortable: false, value: "motivo" },
      { text: "email", sortable: false, value: "email" },
      { text: "Estado", sortable: false, value: "estado" },

      // { text: "Descripción", sortable: false, value: "descripcion" },
      { text: '', value: 'data-table-expand' },

      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      tipo: "",
      motivo: "",
      email: "",
      descripcion: "",
      estado: "",
    },
    defaultItem: {
      tipo: "",
      motivo: "",
      email: "",
      descripcion: "",
      estado: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Editar Estado de la PQRS";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  // avisar al backend que se quieren datos de algún lado(MongoDb)

  methods: {
    getColor (estado) {
        if (estado === 'NL') return 'red'
        else return 'green'
      },

    initialize() {
      // ------------------------------------  traer datos de MongoDB   -------------------------
      getAllPqrs() // llamar a la función
        .then((response) => {
          // cuando lleguen los prometo hacer:
          // console.log(response.data); // qué llega ?
          this.desserts = response.data; // los datos se guardan como array en desserts
        })
        .catch((err) => console.error(err)); //manejar errores
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;

      // console.log(Object.assign({}, item))
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();

      // ------------ Eliminar de forma definitiva pqrs solo si es tipo leida----------------------------
      if (this.editedItem.estado != "NL") {
        let idPQRS= this.editedItem._id;
        deletePqrs(this.editedItem._id) // borrar definitamente de MongoDB :(
          .then(() => {
            // console.log(`carro ${_id} eliminado`);
            console.log("eliminado de forma definitivamente.");
            this.textSnackbar = `La PQRS con código ${idPQRS} ha sido eliminada.`;
            this.snackbar = true; // mostrar notificaicón
          })
          .catch((err) => console.error(err));
      }
      // ------------ FIN Eliminar de forma definitiva ----------------------------
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);

        // ------------ Inicio Actualización permanente en MongoDB ----------------------
        updatePqrs(this.editedItem._id, this.editedItem)
          .then(() => {
            // desplejar mensaje de notificación
            console.log("actualizado");
          })
          .catch((err) => console.error(err));
        // ------------ FIN edición permanente en MongoDB ----------------------
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>