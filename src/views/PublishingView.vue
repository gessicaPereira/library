<template>
    <div id="app">
    <v-app>
    <v-main id="fundo">
      <v-container>
        <v-row>
          <v-col>
      <v-data-table
        class="elevation-1"
        :headers="headers" 
        :search="search" 
        :items="publishings.content">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Editoras</v-toolbar-title>
  
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
                  + Nova editora  
                </v-btn>
              </template>
              <v-card>
              <v-card-text>
                                          <v-container>
                                              <v-form ref="form" v-model="valid" lazy-validation>
                                                  <v-text-field
                                                      v-model="editedItem.name"
                                                      append-icon="mdi-account"
                                                      :rules="[rules.required, rules.maxEditora, rules.min]"
                                                      :counter="80" 
                                                        label="Nome">
                                                  </v-text-field>
  
                                                  <v-text-field
                                                      v-model="editedItem.city"
                                                      append-icon="mdi-city"
                                                      :rules="[rules.required, rules.max, rules.min]"
                                                      :counter="80"
                                                      label="Cidade"
                                                  ></v-text-field>
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
  import publishing from '@/service/publishing'
    export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      valid: true,
      headers: [
        { text: 'Id', value: 'id'},
        { text: 'Nome', value: 'name' },
        { text: 'Cidade', value: 'city' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      publishings: [],
      search: '',
      editedIndex: -1,
      editedItem: {
        name: '',
        city: '',
      },
      defaultItem: {
        name: '',
        city: '',
      },
      rules: {
                required: (value) => !!value || 'Este campo é obrigatório.',
                max: (value) => value.length <= 80 || 'Máximo de 80 caracteres.',
                maxEditora: (value) => value.length <= 80 || 'Máximo de 80 caracteres.',
                min: (value) => value.length >= 3 || 'Mínimo de 3 caracteres.'
            },
    }),

      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'Nova editora' : 'Editar editora'
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
        this.publishings = [
          {
            name: '',
            city: '',
          },
        ]
      },
  
    listPublishing() {
            publishing.getAll().then(resposta => {
                console.log(resposta.data)
                this.isLoading = false;
                this.publishings = resposta.data;             
            });
    },
  
        editItem (item) {
          this.editedIndex = item.id
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
        publishingClear() {
              this.publishing = {
                  id: '',
                  name: '',
                  city: '',
              };
          },
  
        deleteItem (item) {
          this.editedIndex = item.id
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
          this.deleteItemConfirm()
        },
  
        deleteItemConfirm () {
        this.$swal({
        title: 'Você deseja deletar essa editora?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Deletar',
        denyButtonText: 'Cancelar',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.deletePublishing();
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
          this.$refs.form.resetValidation();
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
        if (this.$refs.form.validate()) {
          if (this.editedIndex > -1) {
            this.atualizationPublishing()
          } else {
            this.createPublishing()
          }
          this.close()
        }
      },
  
      async createPublishing() {
        await publishing.post(this.editedItem).then(() => this.listPublishing()).then(() => this.showAlertSuccessPost()).then(() => this.close())
          .catch((e) => {
            this.showAlertErrorPost()
            console.log(e)
          })
      },
    
      async atualizationPublishing() {
        await publishing.put(this.editedIndex, this.editedItem).then(() => this.listPublishing()).then(() => this.showAlertSuccessUpdate()).then(() => this.close())
          .catch((e) => {
            this.showAlertErrorUpdate()
            console.log(e)
          })
      },
  
      async deletePublishing() {
        await publishing.delete(this.editedIndex).then(() => this.listPublishing()).then(() => this.showAlertSuccessDelete())
          .catch((e) => {
            this.showAlertErrorDelete()
            console.log(e)
          })
        },  
        showAlertSuccessPost() {
        this.$swal("", "Editora cadastradoa com sucesso!", "success");
      },
  
      showAlertSuccessDelete() {
        this.$swal("", "Editora deletada com sucesso!", "success");
      },
      showAlertSuccessUpdate() {
        this.$swal("", "Editora atualizada com sucesso!", "success");
      },
        showAlertErrorPost() {
        this.$swal("Não foi possível cadastrar", "Já existe uma editora com esse nome!", "error");
      }, 
      showAlertErrorDelete() {
        this.$swal("Atenção", "Essa editora tem um ou mais livros cadastrados!", "error");
      },
      showAlertErrorUpdate () {
        this.$swal("Não foi possível atualizar", "Já existe uma editora com esse nome!", "error");
      }
    },
    mounted() {
      this.listPublishing();
    }
  }
  </script>
  <style>
  #app{
    margin-top: -325px;

  }
  </style>
  