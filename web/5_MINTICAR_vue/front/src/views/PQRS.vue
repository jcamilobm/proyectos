><template>
    <v-form
        ref="form"
        v-model= "valid"
        lazy-validation
    >   

         <v-select
            v-model= "tipo"
            :items= "items"
            :rules= "[val => !! val || 'Se requiere una opcion']"
            label= "Tipo" required >
        </v-select>

        <v-text-field
            v-model= "motivo"
            :counter= "20"
            :rules= "motivoRules"
            label="Motivo de esta PQRS"
            required>
        </v-text-field>

        <v-text-field
            v-model= "email"
            :rules= "emailRules"
            label="E-mail"
            required
        ></v-text-field>

         <v-textarea
          v-model='descripcion'
          name="input-7-1"
          label="Descripción"
          :counter= "150"
         
        ></v-textarea>

        <v-checkbox
            v-model= "checkbox"
            :rules= "[v => !!v || 'Debe aceptar para enviar su PQRS!']"
            label="Aceptar Terminos, Condiciones y Ley de Proteccion de Datos?"
            required>
        </v-checkbox>
        
        <v-btn
            :disabled= "!valid"
            color="success"
            class="mr-4"
            @click= "validate">
            ENVIAR PQRS
        </v-btn>

        <v-btn
            color="error"
            class="mr-4"
            @click= "reset">
            LIMPIAR
        </v-btn>

        <!-- <v-btn
            color="warning"
            @click = "resetValidation">
            Reset Validacion
        </v-btn> -->

         <!-- mensaje de notificación -->
       <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ textSnackbar}}

            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                Cerrar
              </v-btn>
            </template>
      </v-snackbar>
      <!-- fin  mensaje de notificación -->

    </v-form>

</template>

<script>
import { createPqrs } from "../controllers/Pqrs.controller";  //  controlador para crear usuario.

export default {
    data: () => ({
        valid: true,

        tipo: null,
        items: [
            'Petición',
            'Queja',
            'Reclamo',
            'Sugerencia',
        ],

        motivo:'',

        motivoRules: [
            v => !!v || 'Se requiere documentar esta PQRS',
            v => (v && v.length <= 150) || 'Menos de 200 caracteres',
        ],
        email: '',
        emailRules: [
            v => !!v || 'Se requiere email',
            v => /.+@.+\..+/.test(v) || 'E-mail debe ser valido',
        ],

        descripcion:'',

        checkbox: false,

          // datos mensaje de notificación
        //  datos para el  aviso que se despliega al enviar exitosamente la PQRS.
        snackbar: false,
        textSnackbar: "",
        timeout: 8000,
        
    }),
    

    methods: {
        validate () {
            if( this.$refs.form.validate() ){
                
                const  pqrs = {
                 tipo: this.tipo,
                 motivo:this.motivo,
                 email:this.email,
                 descripcion:this.descripcion
                }

                 createPqrs(pqrs)
                    .then ( () => {
                        
                     this.textSnackbar= "PQRS envíada con éxito.";
                     this.snackbar= true;
                     this.$refs.form.reset() // limpiar formulario.
                                
                    } )
                    .catch( ( err) => {
                        this.textSnackbar = err;
                        this.snackbar = true;
                         
                    } );
               
             } 
        },
        

        reset () {
            this.$refs.form.reset()
        },
        // resetValidation () {
        //     this.$refs.form.resetValidation()
        // },
    },
}
</script>
