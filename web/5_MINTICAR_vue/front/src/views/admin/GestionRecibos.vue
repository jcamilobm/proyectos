<template>
  <v-div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Gestión de recibos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>

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
                >Estás seguro de querer borrar este recibo?</v-card-title
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
  </v-div>
</template>
 


<script>
import { getAllRecibos } from "../../controllers/Recibo.controller"; // cargar de la biblioteca la función necesaria para pedir algo al backend.
import { updateRecibo } from "../../controllers/Recibo.controller";
import { deleteRecibo } from "../../controllers/Recibo.controller";

export default {
  data: () => ({
    //   datos para el  aviso que se despliega al guardar exitosamente.
    snackbar: false,
    textSnackbar: "",
    timeout: 3000,

    search: "",

    select: null,
    opcionesEstado: ["pendiente", "cobrado"],

    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "nombre", sortable: false, value: "nameCliente" },
      { text: "Apellido", sortable: false, value: "lastNameCliente" },
      { text: "documento", sortable: false, value: "documento" },
      { text: "Lugar Recogida", sortable: false, value: "lugarRecogida" },
      { text: "Fecha Recogida", sortable: false, value: "fechaRecogida" },
      { text: "lugar Devolucion", sortable: false, value: "lugarDevolucion" },
      { text: "Fecha Entrega", sortable: false, value: "fechaEntrega" },
      { text: "Total a pagar", sortable: false, value: "totalPagar" },
      { text: "estado", sortable: false, value: "estado" },

      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      nameCliente: "",
      lastNameCliente: "",
      documento: "",
      lugarRecogida: "",
      fechaRecogida: "",
      lugarDevolucion: "",
      fechaEntrega: "",
      modeloCarro: "",
      totalPagar: "",
      estado: "",
    },
    defaultItem: {
      nameCliente: "",
      lastNameCliente: "",
      documento: "",
      lugarRecogida: "",
      fechaRecogida: "",
      lugarDevolucion: "",
      fechaEntrega: "",
      modeloCarro: "",
      totalPagar: "",
      estado: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Editar Estado del recibo";
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
        if (estado === 'pendiente') return 'red'
        else return 'green'
      },

    initialize() {
      // ------------------------------------  traer datos de MongoDB   -------------------------
      getAllRecibos() // llamar a la función
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

      // ------------ Eliminar de forma definitiva al asuario solo si es tipo cliente----------------------------
      if (this.editedItem.estado != "pendiente") {
        let idRecibo = this.editedItem.idRecibo;
        deleteRecibo(this.editedItem._id) // borrar definitamente de MongoDB :(
          .then(() => {
            // console.log(`carro ${_id} eliminado`);
            console.log("eliminado de forma definitivamente.");
            this.textSnackbar = `El recibo con código ${idRecibo} ha sido eliminado.`;
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
        updateRecibo(this.editedItem._id, this.editedItem)
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