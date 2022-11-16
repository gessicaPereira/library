<template>
    <v-app id="inspire">
      <v-navigation-drawer id="lateral" v-model="drawer" app>

        <v-btn block id="inicio"
          depressed tile class="block"
          
          to="/home"
        >
          
          Início
        </v-btn>
        
      <v-btn block id="editora"
          depressed tile class="block"
          
          to="/publishing"
        >
          
          Editora
        </v-btn>

        <v-btn block id="livros"
          depressed tile class="block"
          
          to="/books"
        >
          
          Livros
        </v-btn>

        <v-btn block id="aluguel"
          depressed tile class="block"
          
          to="/rents"
        >
         
          Aluguéis
        </v-btn>

        <span class="mdi mdi-account-circle-outline"></span>
        <v-btn block id="usuario"
          depressed tile class="block"
          
          to="/users"
          
        >
          
          Usuários
        </v-btn>

      </v-navigation-drawer>
      
  
      <v-app-bar id="barra" app
          
          dark>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
  
        <v-toolbar-title>Livraria</v-toolbar-title>
      </v-app-bar>

      <v-main>

      </v-main>
    </v-app>
  </template>
  
  <script>
    export default {
    name: "NavbarComp",
    data: () => ({ drawer: false })
}
  </script>

  <style>
  #inicio{
    margin-top: 150px;
    height: 70px;
    color: blue;
  }
  #editora{
    
    height: 70px;
    width: 10px;
    color: blue;
  }
  #livros{
    
    height: 70px;
    color: blue;
  }
  #aluguel{
    
    height: 70px;
    color: blue;
  }
  #usuario{
    width: 60px;
    height: 70px;
    color: blue;
  }
  #barra{
    background-color: 	#6A5ACD;
  }
  #lateral{
    background-color: #6A5ACD;
  }
</style>