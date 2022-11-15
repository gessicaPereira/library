<template>
    <div id="books">
    <v-app>
    <v-main class="blue accent-2">
      <v-container>
        <v-row>
          <v-col>
      <v-data-table
        class="elevation-1"
        :headers="headers" 
        :search="search" 
        :items="rents"> 
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
                  color="primary"
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
                                                v-model="editedItem.book"
                                                append-icon="mdi-book-open-page-variant"
                                                label="Nome do livro"
                                                :rules="[rules.required]"
                                                ></v-select>

                                                <v-select
                                                :items="useres"
                                                item-text="name"
                                                item-value="id"
                                                v-model="editedItem.user"
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
import rent from '@/service/rent'
import users from '@/service/users'
import moment from 'moment'
    export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      modal: false,
      modal2: false,
      modal3: false,
      valid: true,
      headers: [
        { text: 'Id', align: 'start', value: 'id'},
        { text: 'Livro', value: 'book.name' },
        { text: 'Usuário', value: 'user.name' },
        {
        text: 'Aluguel',
        value: 'rental_date',
        sortable: false,
        align: 'center',
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
      { text: 'Ações', value: 'actions', sortable: false, align: 'center' },
    ],
      rents: [],
      booker: [],
      useres: [],
      search: '',
      editedIndex: -1,
      editedItem: {
        id: 0,
        user: null,
        book: null,
        rental_date: '',
        forecast_return: '',
        return_date: '',
        userId: 0,
        bookId: 0,
      },
      defaultItem: {
        id: 0,
        user: null,
        book: null,
        rental_date: '',
        forecast_return: '',
        return_date: '',
        userId: 0,
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
        this.rents = res.data.content;
        this.rents.forEach((item) => {
          item.rental_date = this.parseDate(item.rental_date)
          item.forecast_return = this.parseDate(item.forecast_return)
          item.return_date = this.formatReturnDate(item.return_date)
          console.log(res.data.content)
        })
        books.getAll().then((res) => {
          this.booker = res.data.content;
          console.log(res.data.content)
        })
        users.getAll().then((res) => {
            this.useres = res;
            console.log(res.data.content)
        })
        this.isLoading = false;
    })
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
            if(isDisaled) return;
          this.editedIndex = item.id
          this.editedItem = Object.assign({}, item)
          this.editedItem.rental_date = this.parseDateISO(item.rental_date)
          this.editedItem.forecast_return = this.parseDateISO(item.forecast_return)
          this.editedItem.return_date = ''
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
            title: 'Retorno interrompido!',
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
            title: 'Deleção interrompida!',
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
      this.editedItem.bookId = this.editedItem.book.id ?? this.editedItem.book;
      this.editedItem.userId =
        this.editedItem.user.id ?? this.editedItem.user;
      if (this.editedIndex > -1) {
        this.update();
      } else {
        this.insert();
      }
      this.close();
    },
  
    async insert() {
      await rent
        .post(this.editedItem)
        .then(() => this.initialize())
        .then(() => {
          this.$swal({
            title: 'Sucesso',
            text: 'Aluguel cadastrado!',
            icon: 'success',
            allowOutsideClick: false,
          }).then(() => {
            window.Toast.fire('Aluguel cadastrado', '', 'success');
          });
        })
        .catch((e) => {
          this.$swal({
            title: 'Opss...',
            text: e.response.data.message,
            icon: 'info',
            allowOutsideClick: false,
          }).then(() => {
            if (e.response.data.code === 401) {
              this.$router.push('login');
            }
            window.Toast.fire('Erro ao cadastrar aluguel', '', 'error');
          });
        });
    },
    async update() {
      await rent
        .put(this.editedIndex, this.editedItem)
        .then(() => this.initialize())
        .then(() => {
          this.$swal({
            title: 'Sucesso',
            text: 'Livro alterado!',
            icon: 'success',
            allowOutsideClick: false,
          }).then(() => {
            window.Toast.fire('Livro alterado', '', 'success');
          });
        })
        .catch((e) => {
          this.$swal({
            title: 'Opss...',
            text: e.response.data.message,
            icon: 'info',
            allowOutsideClick: false,
          }).then(() => {
            if (e.response.data.code === 401) {
              this.$router.push('login');
            }
            window.Toast.fire('Erro ao alterar livro', '', 'error');
          });
        });
    },
    async returnBook() {
      await rent
        .devolution(this.editedIndex)
        .then(() => this.initialize())
        .then(() => {
          this.$swal({
            title: 'Sucesso',
            text: 'Livro devolvido!',
            icon: 'success',
            allowOutsideClick: false,
          }).then(() => {
            window.Toast.fire('Livro devolvido', '', 'info');
          });
        })
        .catch((e) => {
          if (e.response.data.code === 401) {
            this.$router.push('login');
          }
          window.Toast.fire('Erro ao devolver livro', '', 'error');
        });
    },
    
    async delete() {
      await rent
        .delete(this.editedIndex)
        .then(() => this.fetchApi())
        .then(() => {
          this.$swal({
            title: 'Sucesso',
            text: 'Aluguel deletado!',
            icon: 'success',
            allowOutsideClick: false,
          }).then(() => {
            window.Toast.fire('Aluguel deletado', '', 'info');
          });
        })
        .catch((e) => {
          this.$swal({
            title: 'Opss...',
            text: e.response.data.message,
            icon: 'info',
            allowOutsideClick: false,
          }).then(() => {
            if (e.response.data.code === 401) {
              this.$router.push('login');
            }
            window.Toast.fire('Erro ao deletar aluguel', '', 'error');
          });
        });
    },
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
    }
  </script>
  <style>
  #app{
    margin-top: -325px;
  }
  </style>