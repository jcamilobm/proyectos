<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Gestión de usuarios</v-toolbar-title>
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
            <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Nuevo usuario
            </v-btn>
          </template> -->
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.username"
                        label="username"
                        :disabled="true"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.password"
                        label="Password"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <!-- <v-text-field
                        v-model="editedItem.userType"
                        label="rol"
                      ></v-text-field> -->
                      <v-select
                        v-model="editedItem.userType"
                        :items="opcionesUserType"
                        label="rol"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        label="email"
                        :disabled="true"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.cellphone"
                        label="cellphone"
                        :disabled="true"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="name"
                        :disabled="true"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.lastname"
                        label="lastname"
                        :disabled="true"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.documento"
                        label="documento"
                        :disabled="true"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.registrationDate"
                        label="Rdate"
                      ></v-text-field>
                    </v-col>
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
                >Estás seguro de querer borrar este usuario?</v-card-title
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
      <!-- colores -->
      <template v-slot:[`item.userType`]="{ item }">
        <v-chip :color="getColor(item.userType)" dark>
          {{ item.userType }}
        </v-chip>
      </template>
      <!-- fin colores -->

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
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
  </v-container>
</template>
 


<script>
import { getAllUsers } from "../../controllers/User.controller"; // cargar de la biblioteca la función necesaria para pedir algo al backend.
import { updateUser } from "../../controllers/User.controller";
import { deleteUser } from "../../controllers/User.controller";

export default {
  data: () => ({
    //   datos para el  aviso que se despliega al guardar exitosamente.
    snackbar: false,
    textSnackbar: "",
    timeout: 3000,

    search: "",

    select: null,
    opcionesUserType: ["client", "admin"],

    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Username", sortable: false, value: "username" },
      { text: "Password", sortable: false, value: "password" },
      { text: "ROL", sortable: false, value: "userType" },
      { text: "Email", sortable: false, value: "email" },
      { text: "Célular", sortable: false, value: "cellphone" },
      { text: "Nombre", sortable: false, value: "name" },
      { text: "Apellido", sortable: false, value: "lastname" },
      { text: "Documento", sortable: false, value: "documento" },
      { text: "Fecha registro", sortable: false, value: "registrationDate" },

      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      username: "",
      password: "",
      userType: "", // único campo editable por admin
      email: "",
      cellphone: "",
      name: "",
      lastname: "",
      documento: "",
      registrationDate: "",
    },
    defaultItem: {
      username: "",
      password: "",
      userType: "", // único campo editable por admin
      email: "",
      cellphone: "",
      name: "",
      lastname: "",
      documento: "",
      registrationDate: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo usuario" : "Editar rol";
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
    getColor(userType) {
      if (userType === "admin") return "green";
      else return "orange";
    },

    initialize() {
      // ------------------------------------  traer datos de MongoDB   -------------------------
      getAllUsers() // llamar a la función
        .then((response) => {
          // cuando lleguen los prometo hacer:
          console.log(response.data); // qué llega ?
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
      if (this.editedItem.userType != "admin") {
        let userDelate = this.editedItem.username;
        deleteUser(this.editedItem._id) // borrar definitamente de MongoDB :(
          .then(() => {
            // console.log(`carro ${_id} eliminado`);
            console.log("eliminado de forma definitivamente.");
            this.textSnackbar = `${userDelate} ha sido elimiand@`;
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
        updateUser(this.editedItem._id, this.editedItem)
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