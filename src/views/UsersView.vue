<template>
  <div id="useres">
  <v-app>
  <v-main id="fundo">
    <v-container>
      <v-row>
        <v-col>
    <v-data-table
      class="elevation-1"
      :headers="headers" 
      :search="search" 
      :items="user.content">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Usuários</v-toolbar-title>

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
                + Novo usuário 
              </v-btn>
            </template>
            <v-card>
            <v-card-text>
                                        <v-container>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-text-field
                                                    v-model="editedItem.name"
                                                    append-icon="mdi-account"
                                                    label="Nome"
                                                    :rules="[rules.required, rules.min_counter, rules.counter]" counter="80"
                                                     maxlength="80"
                                                ></v-text-field>

                                                <v-text-field
                                                    v-model="editedItem.address"
                                                    append-icon="mdi-map-marker"
                                                    label="Endereço"
                                                    :rules="[rules.required, rules.min_counter, rules.counter]" counter="80"
                                                    maxlength="80"
                                                    
                                                ></v-text-field>

                                                <v-text-field
                                                    v-model="editedItem.city"
                                                    append-icon="mdi-city"
                                                    label="Cidade"
                                                    :rules="[rules.required, rules.min_counter, rules.counter]" counter="80"
                                                    maxlength="80"
                                                ></v-text-field>

                                                <v-text-field
                                                    v-model="editedItem.email"
                                                    label="Email"
                                                    append-icon="mdi-email"
                                                    :rules="[rules.required, rules.email]">
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
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Deseja deletar este usuário?</v-card-title>
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
                                <v-icon class="mr-2" color="red" @click="deleteItemConfirm(item)" v-bind="attrs" v-on="on">
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
import usersService from '@/service/usersService'
  export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    valid: true,
    headers: [
      { text: 'Id', value: 'id'},
      { text: 'Nome', value: 'name' },
      { text: 'Cidade', value: 'city' },
      { text: 'Endereço', value: 'address' },
      { text: 'Email', value: 'email' },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    user: [],
    search: '',
    editedIndex: -1,
    editedItem: {
      name: '',
      city: '',
      address: '',
      email: '',
    },
    defaultItem: {
      name: '',
      city: '',
      address: '',
      email: '',
    },
    rules: {
      required: value => !!value || 'Campo obrigatorio!',
      counter: value => value.length <= 35 || 'Max 35 caracteres.',
      min_counter: value => value.length >= 3 || 'Min 3 caracteres.',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'E-mail inválido!'
      },
    },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo usuário' : 'Editar usuário'
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
      this.user = [
        {
          name: '',
          city: '',
          address: '',
          email: '',
        },
      ]
    },

    listUser() {
            usersService.getAll().then(resposta => {
                console.log(resposta.data)
                this.isLoading = false;
                this.user = resposta.data;             
            });
        },

      editItem (item) {
        this.editedIndex = item.id
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      userClear() {
            this.user = {
                id: '',
                name: '',
                city: '',
                address: '',
                email: ''
            };
        },

      deleteItem (item) {
        this.editedIndex = item.id
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.$swal({
        title: 'Você deseja deletar esse usuário?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Deletar',
        denyButtonText: 'Cancelar',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteUser();
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
          this.atualizationUser()
        } else {
          this.createUser()
        }
        this.close()
      }
    },

    async createUser() {
      await usersService.post(this.editedItem).then(() => this.listUser()).then(() => this.showAlertSuccessPost()).then(() => this.close())
        .catch((e) => {
          this.showAlertErrorPost()
          console.log(e)
        })
    },
  
    async atualizationUser() {
      await usersService.put(this.editedIndex, this.editedItem).then(() => this.listUser()).then(() => this.showAlertSuccessUpdate()).then(() => this.close())
        .catch((e) => {
          this.showAlertErrorUpdate()
          console.log(e)
        })
    },

    async deleteUser() {
      await usersService.delete(this.editedIndex).then(() => this.listUser()).then(() => this.showAlertSuccessDelete())
        .catch((e) => {
          this.showAlertErrorDelete()
          console.log(e)
        })
      },  
      showAlertSuccessPost() {
      this.$swal("", "Usuário cadastrado com sucesso!", "success");
    },

    showAlertSuccessDelete() {
      this.$swal("", "Usuário deletado com sucesso!", "success");
    },
    showAlertSuccessUpdate() {
      this.$swal("", "Usuário atualizado com sucesso!", "success");
    },
      showAlertErrorPost() {
      this.$swal("Não foi possível cadastrar", "Já existe um usuário com esse email!", "error");
    }, 
    showAlertErrorDelete() {
      this.$swal("Atenção", "Esse usuário tem um ou mais aluguéis.", "error");
    },
    showAlertErrorUpdate () {
      this.$swal("Não foi possível atualizar", "Já existe um usuário com esse email!", "error");
    }
  },
  mounted() {
    this.listUser();
  }
}
</script>
<style>
#useres{
  margin-top: -325x;
}
#fundo{
  background-color:	#8470FF ;
}
#btn{
  background-color: #6A5ACD;
}
#btn2{
   
  color: #6A5ACD;
}
</style>
