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
        :items="rental"> 
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Aluguéis</v-toolbar-title>

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
                  + Novo aluguel  
                </v-btn>
              </template>
              <v-card>
              <v-card-text>
                                          <v-container>
                    <v-form ref="form" v-model="valid" lazy-validation>
                                               <v-select
                                                :items="booker"
                                                item-text="name"
                                                item-value="id"
                                                v-model="editedItem.books"
                                                append-icon="mdi-book-open-page-variant"
                                                label="Nome do livro"
                                                :rules="[rules.required]"
                                                ></v-select>

                                                <v-select
                                                :items="users"
                                                item-text="name"
                                                item-value="id"
                                                v-model="editedItem.users"
                                                append-icon="mdi-account"
                                                label="Nome do usuário"
                                                :rules="[rules.required]"
                                                ></v-select>

                                                <v-menu
                                                v-model="modal"
                                                :nudge-right="0"
                                                :close-on-content-click="false"
                                                transition="slide-y-transitionn"
                                                offset-y
                                                min-width="auto"
                                                >

                                                <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                v-model="editedItem.rental_date"
                                                label="Data de aluguel"
                                                append-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                :rules="[rules.required]"
                                                ></v-text-field>
                                            </template>

                                            <v-date-picker
                                            v-model="editedItem.rental_date"
                                            @input="modal = false"
                                            locale="pt-br"
                                            color="c500"
                                            scrollable
                                            :max="computedTodayDate"
                                        ></v-date-picker>
                                        </v-menu>

                                        <v-menu
                                            v-model="modal2"
                                            :nudge-right="0"
                                            :close-on-content-click="false"
                                            transition="slide-y-transition"
                                            offset-y
                                            min-width="auto"
                                        >

                                        <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                        v-model="editedItem.forecast_return"
                                        label="Previsão de retorno"
                                        append-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="[rules.required]"
                                        ></v-text-field>
                                    </template>


                                    <v-date-picker
                                    v-model="editedItem.forecast_return"
                                    @input="modal2 = false"
                                    locale="pt-br"
                                    color="c500"
                                    scrollable
                                    :min="editedItem.rental_date"
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

        <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title class="text-h7">
                            <v-icon>mdi-alertcircle</v-icon>Você tem certeza que deseja deletar?
                          </v-card-title>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="closeDelete">Cancelar</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">Confirmar</v-btn>
                            <v-spacer></v-spacer>
                          </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog2" max-width="370px" persistent content-class="round">
                        <v-card>
                          <v-card-title class="headline">
                            <v-spacer></v-spacer> <span class="mt-2 mb-4">Devolver livro</span>
                            <v-spacer></v-spacer>
                          </v-card-title>
                          <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn color="red darken-1" class="mb-2" text @click="close">
                              Cancelar
                            </v-btn>
                            <v-btn color="blue darken-1" class="mb-2" text @click="save">
                              Ok
                            </v-btn>
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>

<template v-slot:[`item.status`]="{ item }">
    <v-chip class="elevation-3" :color="getColor(item)" dark>
      {{ item.status }}
    </v-chip>
  </template>

<template v-slot:[`item.actions`]="{ item }">
    <v-tooltip top color="red" v-if="item.return_date !== 'Em espera'">
      <template v-slot:activator="{ on, attrs }">
        <v-icon  size="20" color="red" v-bind="attrs" v-on="on" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <span>Excluir</span>
    </v-tooltip>

                <v-tooltip top color="blue" v-else>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v size="22" class="mr-5" color="green accent-3" v-bind="attrs" v-on="on"
                          @click="returnItemConfirm(item)">
                          mdi-check-bold
                        </v-icon>
                      </template>
                      <span>Devolver</span>
                </v-tooltip>
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
import rent from '@/service/rent'
import usersService from '@/service/usersService'
import moment from 'moment'
    export default {
    data: () => ({
      dialog: false,
      dialog2: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dialogDelete: false,
      modal: false,
      modal2: false,
      modal3: false,
      valid: true,
      headers: [
        { text: 'Id', align: 'start', value: 'id'},
        { text: 'Livro', value: 'books.name' },
        { text: 'Usuário', value: 'users.name' },
        {text: 'Aluguel', value: 'rental_date', sortable: false,align: 'center',
      },
      {
        text: 'Previsão',
        value: 'forecast_return',
        sortable: false,
        align: 'center',
      },
      {
        text: 'Devolução',
        value: 'return_date',
        sortable: false,
        align: 'center',
      },
      { text: 'Status', value: 'status' },
      { text: 'Ações', value: 'actions', sortable: false, align: 'center' },
    ],
      rental: [],
      booker: [],
      users: [],
      search: '',
      editedIndex: -1,
      editedItem: {
        id: 0,
        users: null,
        books: null,
        rental_date: '',
        forecast_return: '',
        return_date: '',
        user: 0,
        bookId: 0,
      },
      defaultItem: {
        id: 0,
        users: null,
        books: null,
        rental_date: '',
        forecast_return: '',
        return_date: '',
        user: 0,
        bookId: 0,
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
          return this.editedIndex === -1 ? 'Nova aluguel' : 'Editar aluguel'
        },
        computedTodayDate() {
        return moment(new Date()).format('yyyy-MM-DD');
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
      await rent.getAll().then((res) => {
        this.rental = res.data.content;
        this.rental.forEach((item) => {
          item.rental_date = this.parseDate(item.rental_date)
          item.forecast_return = this.parseDate(item.forecast_return)
          item.return_date = this.formatReturnDate(item.return_date)

          if (item.return_date == null) {
            return item.return_date = "Em espera"
            }
          console.log(res.data.content)
        })
        booksService.getAll().then((res) => {
          this.booker = res.data.content;
          console.log(res.data.content)
        })
        usersService.getAll().then((res) => {
            this.users = res.data.content;
            console.log(res.data.content)
        })
        this.isLoading = false;
    })
    },

    getColor(item) {
      if (item.status === 'DEADLINE') return 'green'
      else if (item.status === 'LATE') return 'red'
      else if (item.status === 'PROGRESS') return 'blue'
    },

    parseDate(date) {
      return moment(date).format('DD-MM-yyyy');
    },
    parseDateISO(date) {
      const [dd, mm, yyyy] = date.split('-')
      return `${yyyy}-${mm}-${dd}`
    },
    formatReturnDate(data) {
      if (!/^[0-9]+/.test(data)) return data;
      let dateToPrint = this.parseDate(data.substring(0, 10))
      let textToPrint = data.substring(10, data.length)
      return dateToPrint + textToPrint
    },
  
        editItem (item, isDisaled) {
          if (isDisaled) return;
          this.editedIndex = item.id
          this.editedItem = Object.assign({}, item)
          this.editedItem.rental_date = this.parseDateISO(item.rental_date)
          this.editedItem.forecast_return = this.parseDateISO(item.forecast_return)
          this.editedItem.return_date = this.date(item.return_date)
          this.dialog = true
        },

        returnItem(item) {
        this.editedIndex = item.id;
        this.returnItemConfirm();
        },
  
        deleteItem (item) {
          this.editedIndex = item.id
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
          this.deleteItemConfirm()
        },
        
    returnItemConfirm() {
      this.$swal({
        title: 'Você deseja devolver esse livro?',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'Devolver',
        denyButtonText: 'Cancelar',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
            this.returnBook();
        } else if (result.isDenied) {
          this.$swal({
            title: 'Ação cancelada!',
            icon: 'info',
            allowOutsideClick: false,
          });
        }
        this.$nextTick(() => {
          this.editedIndex = -1;
        });
      });
    },
  
    deleteItemConfirm() {
      this.$swal({
        title: 'Você deseja deletar esse aluguel?',
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
          if (this.$refs.form) this.$refs.form.resetValidation();
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
      this.editedItem.bookId = this.editedItem.books.id ?? this.editedItem.books;
      this.editedItem.user = this.editedItem.users.id ?? this.editedItem.users;
      if (this.editedIndex > -1) {
        this.returnBook();
      } else {
        this.insert();
      }
      this.close();
    },
  
    async insert() {
      await rent.post(this.editedItem)
        .then(() => this.initialize()).then(() => 
          this.showAlertSuccessPost()).then(() => this.close())
          .catch(() => {
            this.showAlertErrorPost()
          });
    },

    async returnBook() {
      await rent.devolution(this.editedIndex)
        .then(() => this.initialize())
        .then(() => 
          this.showAlertSuccessReturn()).then(() => this.close())
          .catch(() => {
            this.showAlertErrorReturn()
          });
          
    },
    
    async delete() {
      await rent
        .delete(this.editedIndex)
        .then(() => this.initialize())
        .then(() => 
          this.showAlertSuccessDelete()).then(() => this.close())
          .catch(() => {
            this.showAlertErrorDelete()
          });
    },

      showAlertSuccessPost() {
        this.$swal("", "Aluguel cadastrado com sucesso!", "success");
      },
      showAlertSuccessDelete() {
        this.$swal("", "Aluguel deletado com sucesso!", "success");
      },
        showAlertErrorPost() {
        this.$swal("Não foi possível cadastrar",  "error");
      }, 
      showAlertErrorDelete() {
        this.$swal("Atenção", "Não foi possivel deletar", "error");
      },
      showAlertSuccessReturn() {
        this.$swal("Sucesso!", "Livro devolvido", "success");
      },
      showAlertErrorReturn() {
        this.$swal("Erro!", "Não foi possivel devolver este livro", "error");
      }
    }}

  </script>
  <style>
  #app{
    margin-top: -325px;
  }
  </style>