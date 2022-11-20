<template>
    <v-footer padless>
      <v-col
        class="text-center"
        cols="12"
      >
      <strong>WDA  Livraria</strong> - {{ new Date().getFullYear() }} 
      </v-col>
    </v-footer>
  </template>
  <script>
  export default {
    name: 'FooterComp'
  }
</script>

<style scoped>
.text-center{
    padding: 40px;
    text-align: center;
    color: #6A5ACD;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>