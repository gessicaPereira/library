<template>
    <div id="book">
    <v-app>
    <v-main class="blue accent-2">
      <v-container>
        <v-row>
          <v-col>
      <v-data-table 
        class="elevation-1"
        :headers="headers" 
        :search="search" 
        :items="book">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Livros</v-toolbar-title>
  
            <v-divider class="mx-5" inset vertical></v-divider>
      
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisar" color="blue"
                          single-line hide-details>
                          </v-text-field>
  
            <v-spacer></v-spacer>
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  style="margin-top: 9px;"
                  v-bind="attrs"
                  v-on="on"
                >
                  + Novo livro 
                </v-btn>
              </template>
              <v-card>
              <v-card-text>
                                          <v-container>
                                              <v-form ref="form" v-model="valid" lazy-validation>
                                                  <v-text-field
                                                      v-model="editedItem.name"
                                                      :rules="[rules.required, rules.max, rules.min]"
                                                        :counter="80" label="Nome"
                                                  ></v-text-field>
  
                                                  <v-text-field
                                                      v-model="editedItem.author"
                                                      :rules="[rules.required, rules.max, rules.min]"
                                                        :counter="80" label="Autor"
                                                      
                                                  ></v-text-field>
  

                                                  <v-select
                                                    v-model="editedItem.publishing"
                                                    :rules="[rules.required]"
                                                    :items="publishings.content" 
                                                    item-text="name"
                                                    item-value="publishingId"
                                                    label="Editora*"
                                                    return-object
                                                    append-icon="mdi-bookshelf"
                                                    required
                                                    color="#198754"
                                                ></v-select>

                                                <v-menu
                                                    v-if="editedIndex == -1"
                                                    v-model="menu1"
                                                    :close-on-content-click="false"
                                                    :nudge-right="40"
                                                    transition="scale-transition"
                                                    offset-y
                                                    max-width="290px"
                                                    min-width="auto"
                                                >
  
                                                  <v-text-field
                                                      v-model="editedItem.quantity" type="number"
                                                      :rules="[rules.required, rules.minNumber]" label="Quantidade">
                                                  ></v-text-field>

                                                  <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field
                                                            :value="launchDateFormatted"
                                                            
                                                            label="Data de lançamento*"
                                                            append-icon="mdi-calendar"
                                                            readonly
                                                            id="launch"
                                                            required
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            color="#198754"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                        v-model="editedItem.launch"
                                                        :min="dataAtual"
                                                        @input="menu1 = false"
                                                        color="#198754"
                                                    ></v-date-picker>

                                </v-menu>
                                <v-menu
                                                    v-if="editedIndex != -1"
                                                    v-model="menu2"
                                                    :close-on-content-click="false"
                                                    :nudge-right="40"
                                                    transition="scale-transition"
                                                    offset-y
                                                    max-width="290px"
                                                    min-width="auto"
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field
                                                            :value="launchDateFormatted"
                                                            
                                                            label="Data de lançamento*"
                                                            append-icon="mdi-calendar"
                                                            readonly
                                                            id="launch"
                                                            required
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            color="#198754"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                        v-model="editedItem.launch"
                                                        :max="dataAtual"
                                                        :min="dataAtual"
                                                        @input="menu2 = false"
                                                        color="#198754"
                                                    ></v-date-picker>
                                                </v-menu>
                                              </v-form>
                                              
                                          </v-container>
                                      </v-card-text>
                                      <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn color="red" text @click="close">
                                              Cancelar
                                          </v-btn>
                                          <v-btn color="blue darken-1" text @click="save">
                                              Salvar
                                          </v-btn>
                                      </v-card-actions>
                                  </v-card>
                              </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Deseja deletar este livro?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">Sim</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        
        <template v-slot:[`item.quantity`]="{ item }">
                    <v-chip class="elevation-3">
                      {{ item.quantity }}
                    </v-chip>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon size="22" color="blue" small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon color="red" small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
        </template>
      </v-data-table>
      </v-col>
      </v-row>
    </v-container>
    </v-main>
    </v-app>
    </div>
    </template>
   
  <script>
  import books from '@/service/books'
  import publishing from '@/service/publishing'
  import moment from "moment"


    export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      nowDate: new Date().toISOString().slice(0, 10),
      headers: [
        { text: 'Id', value: 'id'},
        { text: 'Nome', value: 'name' },
        { text: 'Autor', value: 'author' },
        { text: 'Editora', value: 'publishing.name' },
        {text: 'Quantidade', value: 'quantity'},
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      book: [],
      publishings: [],
      launchDateFormated: [],
      valid: true,
            menu1: false,
            menu2: false,
            dataAtual: '',
      search: '',
      editedIndex: -1,
      editedItem: {
        name: '',
        author: '',
        launch: '',
        quantity: '',
        publishing: {
            publishingId: '',
            name: '',
            city: '',
        }
      },
      defaultItem: {
        name: '',
        author: '',
        publishingId: 0,
        publishing: '',
        launch: '',
        quantity: '',
      },
      rules: {
      required: (value) => !!value || 'Este campo é obrigatório.',
      max: (value) => value.length <= 80 || 'Máximo de 80 caracteres.',
      maxAutor: (value) => value.length <= 80 || 'Máximo de 80 caracteres.',
      min: (value) => value.length >= 3 || 'Mínimo de 3 caracteres.',
      minNumber: (value) => value >= 0 || 'No mínimo 1 é necessário.'
    },
      }),
  
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'Novo livro' : 'Editar livro'
        },
      },
  
      watch: {
        dialog (val) {
          val || this.close()
        },
        dialogDelete (val) {
          val || this.closeDelete()
        },
      },
  
      created () {
        this.initialize()
      },
      
      methods: {
      initialize() {
        this.book = [
          {
            name: '',
            city: '',
          },
        ]
      },

      async listBook() {
      await books.getAll()
        .then((response) => {
          this.books = response.data;
          this.books.forEach(item => {
            item.launch = this.listDate(item.launch)
          })
        
          this.loading = false  
        
        })
    },
    async listPublishing() {
      await publishing.getAll()
        .then((response) => {
          this.publishers = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    
    listDate(date) {
      return moment(date).format('DD/MM/YYYY');
    },
        
    editItem(item) {
      this.editedIndex = item.id
      this.editedItem = { ...item }
      this.editedItem.launch = this.editDate(this.editedItem.launch)
      this.dialog = true
    },
  
        deleteItem (item) {
          this.editedIndex = item.id
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.deleteBook()
          this.closeDelete()
        },
  
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
          this.$refs.form.resetValidation();
        },
  
        closeDelete () {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        save() {
        if (this.$refs.form.validate()) {
          if (this.editedIndex > -1) {
            this.atualizationBook()
          } else {
            this.createBook()
          }
          this.close()
        }
      },
  
      async createBook() {
        await books.post(this.editedItem).then(() => this.listBook()).then(() => this.showAlertSuccessPost()).then(() => this.close())
          .catch((e) => {
            this.showAlertErrorPost()
            console.log(e)
          })
      },
    
      async atualizationBook() {
      await books.update(this.editedIndex, this.editedItem).then(() => this.listBook())
        .catch((e) => {
          console.log(e)
        })
    },
  
    async deleteBook() {
      await books.delete(this.editedIndex).then(() => this.listBook()).then(() => this.showAlertSuccessDelete())
        .catch((e) => {
          this.showAlertError2()
          console.log(e)
        })
        },  
        showAlertSuccessPost() {
        this.$swal("", "Livro cadastrado com sucesso!", "success");
      },
  
      showAlertSuccessDelete() {
        this.$swal("", "Livro deletado com sucesso!", "success");
      },
        showAlertErrorPost() {
        this.$swal("Não foi possível cadastrar", "error");
      }, 
      showAlertError2() {
      this.$swal("Erro", "Esse livro está alugado!", "error");
    },
    mounted() {
      this.listBook();
      this.listPublishing();
    },
}}
  </script>


  