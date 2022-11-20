<template>
    <v-app id="inspire">
      <v-navigation-drawer id="lateral" v-model="drawer" app>

        <!--<span class="mdi mdi-firebase" id="icone"></span> -->


        <svg xmlns="http://www.w3.org/2000/svg" id="icone" width="80" height="100" viewBox="0 0 24 24"><path opacity=".3" d="M13 13l-3-2.25L7 13V4H6v16h12V4h-5z"/><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6V4h1v9l3-2.25L13 13V4h5v16z"/></svg>
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

        
        <v-btn block id="usuario"
          depressed tile class="block" append-icon="mdi mdi-account-circle-outline"
          
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
  #icone{
    margin-left: 90px;
    margin-top: 20px;
  }
  #inicio{
    margin-top: 6 0px;
    height: 80px;
    color: white;
    background-color: #6A5ACD;
  }
  #editora{
    
    height: 80px;
    width: 10px;
    color: white;
    background-color: #6A5ACD;
  }
  #livros{
    
    height: 80px;
    color: white;
    background-color: #6A5ACD;
  }
  #aluguel{
    
    height: 80px;
    color: white;
    background-color: #6A5ACD;
  }
  #usuario{
    width: 60px;
    height: 80px;
    color: white;
    background-color: #6A5ACD;
  }
  #barra{
    background-color: 	#6A5ACD;
  }
  #lateral{
    background-color: #6A5ACD;
  }
</style>