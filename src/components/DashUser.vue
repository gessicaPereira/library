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

<script>
import usersService from '@/service/usersService';

export default {
  data: () => ({
      user: [],
      quantUser: [],
  }),
  methods: {
      listUser() {
          usersService.getAll().then((resposta) => {
              this.user = resposta.data;
              this.quantUser = this.user.length;
              console.log(resposta.data)
          });
      },

  mounted() {
      this.listUser();
  },
  }}
</script>
<style>
</style>