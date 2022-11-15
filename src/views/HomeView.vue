<template>
  <v-container id="dashUser">
      <v-row>
          <v-card  color="white"  rounded="xl">
              <v-row>
                  <v-col>
                      <v-list-item three-line>
                          <v-list-item-content>
                              <div class="mb-4">
                                  <v-btn fab color="white" elevation="0" to="/users">
                                      <v-icon color="black">mdi-account</v-icon>
                                  </v-btn>
                              </div>
                              <v-list-item-subtitle class="font-weight-bold black--text"> Quantidade de Usuários
                              </v-list-item-subtitle>
                              <v-list-item-title class="headline mb-1 black--text">
                                  {{ quantUser }}
                              </v-list-item-title>
                          </v-list-item-content>
                      </v-list-item>
                  </v-col>
              </v-row>
          </v-card>
      </v-row>
  </v-container>
</template>

<template>
  <v-container id="dashUser">
      <v-row>
          <v-card  color="white"  rounded="xl">
              <v-row>
                  <v-col>
                      <v-list-item three-line>
                          <v-list-item-content>
                              <div class="mb-4">
                                  <v-btn fab color="white" elevation="0" to="/users">
                                      <v-icon color="black">mdi-account</v-icon>
                                  </v-btn>
                              </div>
                              <v-list-item-subtitle class="font-weight-bold black--text"> Quantidade de Usuários
                              </v-list-item-subtitle>
                              <v-list-item-title class="headline mb-1 black--text">
                                  {{ quantBook }}
                              </v-list-item-title>
                          </v-list-item-content>
                      </v-list-item>
                  </v-col>
              </v-row>
          </v-card>
      </v-row>
  </v-container>
</template>
<script>
import users from '@/service/usersService';
import books from '@/service/booksService';

export default {
  data: () => ({
      user: [],
      quantUser: [],
      book: [],
      quantBook: [],
  }),
  methods: {
      list() {
          users.getAll().then((resposta) => {
              this.user = resposta.data;
              this.quantUser = this.user.length;
          });
      },
      listUser(){
        books.getAll().then((resposta) => {
              this.user = resposta.data;
              this.quantBook = this.book.length;
      })
  },

  mounted() {
      this.list();
  },
  }}
</script>
<style>
#dashUser{
  margin-top: -200px;
}
</style>