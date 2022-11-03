<template>
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app>

        <v-btn block id="inicio"
          depressed tile class="block"
          
          to="/"
        >
          <Books />
          Início
        </v-btn>
        
      <v-btn block id="editora"
          depressed tile class="block"
          
          to="/publishing"
        >
          <Books />
          Editora
        </v-btn>

        <v-btn block id="livros"
          depressed tile class="block"
          
          to="/books"
        >
          <Books />
          Livros
        </v-btn>

        <v-btn block id="aluguel"
          depressed tile class="block"
          
          to="/rent"
        >
          <Books />
          Aluguéis
        </v-btn>

        <v-btn block id="usuario"
          depressed tile class="block"
          
          to="/users"
        >
          <Books />
          Usuários
        </v-btn>

      </v-navigation-drawer>
      
  
      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
  
        <v-toolbar-title>WDA BOOKSTORE</v-toolbar-title>
      </v-app-bar>

      <v-main>

      </v-main>
    </v-app>
  </template>
  
  <script>
    export default {
    name: "NavbarComp",
    data: () => ({ drawer: true })
}
  </script>

  <style>
  #inicio{
    margin-top: 110px;
    height: 50px;
    color: blue;
  }
  #editora{
    margin-top: 20px;
    height: 50px;
    color: blue;
  }
  #livros{
    margin-top: 20px;
    height: 50px;
    color: blue;
  }
  #aluguel{
    margin-top: 20px;
    height: 50px;
    color: blue;
  }
  #usuario{
    margin-top: 20px;
    height: 50px;
    color: blue;
  }
</style>

