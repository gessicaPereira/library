<template>
    <div id="books">
    <v-app>
    <v-main id="fundo">
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
                  id="btn"
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
                                                      append-icon="mdi-book"
                                                      :rules="[rules.required, rules.max, rules.min]"
                                                      :counter="80" 
                                                        label="Nome">
                                                  </v-text-field>
                                                  
                                                  <v-text-field
                                                      v-model="editedItem.author"
                                                      append-icon="mdi-account"
                                                      :rules="[rules.required, rules.max, rules.min]"
                                                      :counter="80"
                                                      label="Autor"
                                                  ></v-text-field>

                                                  <v-text-field v-model="editedItem.quantity" type="number"
                                                        :rules="[rules.required, rules.minNumber]" label="Quantidade">
                                                    </v-text-field>

                                                  <v-select :items="publisher" v-model="editedItem.publishing" append-icon="mdi-book-marker" item-text="name"
                                                    item-value="id" :rules="[rules.required]" label="Editora">
                                                  </v-select>

                                                  <v-menu
                                                        v-model="modal"
                                                        :nudge-right="0"
                                                        :close-on-content-click="false"
                                                        transition="slide-y-transition"
                                                        offset-y
                                                        min-width="auto"
                                                    > 

                                                  <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field
                                                        v-model="editedItem.launch"
                                                        label="Data de lançamento"
                                                        append-icon="mdi-calendar"
                                                        readonly
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        :rules="[rules.required]"
                                                        ></v-text-field>
                                                    </template> 
                                                
                                                    <v-date-picker
                                                        v-model="editedItem.launch"
                                                        @input="modal = false"
                                                        locale="pt-br"
                                                        color="c500"
                                                        :max="todayDate"
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
                              
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
                        <v-tooltip top color="#6A5ACD">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon size="22" class="mr-2" color="#6A5ACD" @click="editItem(item)" v-bind="attrs" v-on="on">
                                    mdi-pencil
                                </v-icon>
                            </template>
                            <span>Alterar</span>
                        </v-tooltip>
                        <v-tooltip top color="red">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon class="mr-2" color="red" @click="deleteItem(item)" v-bind="attrs" v-on="on">
                                    mdi-delete
                                </v-icon>
                            </template>
                            <span>Deletar</span>
                        </v-tooltip>
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
import booksService from '@/service/booksService'
import publishing from '@/service/publishing'
import moment from 'moment'

    export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      modal: false,
      valid: true,
      todayDate: new Date().toISOString().slice(0, 10),
      headers: [
        { text: 'Id', align: 'start', value: 'id'},
        { text: 'Nome', value: 'name' },
        { text: 'Autor', value: 'author' },
        {text: 'Editora', value: 'publishing.name'},
        {
        text: 'Lançamento',
        value: 'launch',
        sortable: false,
        align: 'center',
      },
      { text: 'Quantidade', value: 'quantity', align: 'center' },
      { text: 'Ações', value: 'actions', sortable: false, align: 'center' },
    ],

      book: [],
      publisher: [],
      search: '',
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: '',
        quantity: '',
        launch: '',
        author: '',
        publishing: null,
        publishingId: 0,
      },
      defaultItem: {
        id: 0,
        name: '',
        quantity: '',
        launch: '',
        author: '',
        publishing: null,
        publishingId: 0,
      },
      rules: {
                required: (value) => !!value || 'Este campo é obrigatório.',
                max: (value) => value.length <= 80 || 'Máximo de 80 caracteres.',
                maxEditora: (value) => value.length <= 80 || 'Máximo de 80 caracteres.',
                min: (value) => value.length >= 3 || 'Mínimo de 3 caracteres.',
                minQuantity: (value) => value.length >=1 || 'A quantidade não pode ser menor que 1! ',
            },
    }),

      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'Nova livro' : 'Editar livro'
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
    async initialize() {
      await booksService.getAll().then((res) => {
        this.book = res.data.content;
        this.book.forEach((item) => {
          item.launch = this.parseDate(item.launch);
        });
        publishing.getAll().then((res) => {
          this.publisher = res.data.content;
        });
        this.isLoading = false;
        console.log(this.book)
      });
    },

    parseDate(date) {
      return moment(date).format('DD-MM-yyyy');
    },

    parseDateISO(date) {
      const [dd, mm, yyyy] = date.split('-')
      return `${yyyy}-${mm}-${dd}`
    },
  
        editItem (item) {
          this.editedIndex = item.id
          this.editedItem = Object.assign({}, item)
          this.editedItem.launch = this.parseDateISO(item.launch);
          this.dialog = true;
          console.log(this.editedItem)
        },
  
        deleteItem (item) {
          this.editedIndex = item.id
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
          this.deleteItemConfirm()
        },
  
        deleteItemConfirm () {
        this.$swal({
        title: 'Você deseja deletar esse livro?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Deletar',
        denyButtonText: 'Cancelar',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.delete();
        } else if (result.isDenied) {
          this.$swal({
            title: 'Ação cancelada!',
            icon: 'info',
            allowOutsideClick: false,
          });
        }
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      });
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
      if (!this.$refs.form.validate()) return;
      this.editedItem.publishingId =
        this.editedItem.publishing.id ?? this.editedItem.publishing;
      if (this.editedIndex > -1) {
        this.updateBook();
      } else {
        this.createBook();
      }
      this.close();
    },
  
      async createBook() {
        await booksService.post(this.editedItem).then(() => this.initialize()).then(() => this.showAlertSuccessPost()).then(() => this.close())
          .catch((e) => {
            this.showAlertErrorPost()
            console.log(e)
          })
      },
    
      async updateBook() {
        await booksService.put(this.editedIndex, this.editedItem).then(() => this.initialize()).then(() => this.showAlertSuccessUpdate()).then(() => this.close())
          .catch((e) => {
            this.showAlertErrorUpdate()
            console.log(e)
          })
      },
  
      async delete() {
        await booksService.delete(this.editedIndex).then(() => this.initialize()).then(() => this.showAlertSuccessDelete())
          .catch((e) => {
            this.showAlertErrorDelete()
            console.log(e)
          })
        },  
        showAlertSuccessPost() {
        this.$swal("", "Livro cadastrado com sucesso!", "success");
      },
  
      showAlertSuccessDelete() {
        this.$swal("", "Livro deletado com sucesso!", "success");
      },
      showAlertSuccessUpdate() {
        this.$swal("", "Livro atualizado com sucesso!", "success");
      },
        showAlertErrorPost() {
        this.$swal("Não foi possível cadastrar", "Já existe uma editora com esse nome!", "error");
      }, 
      showAlertErrorDelete() {
        this.$swal("Atenção", "Esse livro tem um ou mais aluguéis associados!", "error");
      },
    }}
  </script>
  <style>
  #app{
    margin-top: -325px;

  }
  </style>
  