<template>
      <v-app>
        <NavbarComp />
        <v-main>
          <router-view />
        </v-main>
        <FooterComp />
      </v-app>
</template>

<script>
import NavbarComp from './components/NavbarComp.vue';
import FooterComp from './components/FooterComp.vue';
export default {
  name: 'App',
  components: {
    FooterComp, 
    NavbarComp,
  },
};

</script>