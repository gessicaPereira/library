<template>
  <v-app>
      <v-main class="blue accent-2">
          <v-container>
              <v-row>
                  <v-col>
                      <DashUser></DashUser>
                      <DashRent></DashRent>
                  </v-col>
              </v-row>
          </v-container>
      </v-main>
  </v-app>
</template>

<script>
import DashUser from '@/components/DashUser.vue';
import DashRent from '@/components/DashRent.vue';

export default {
  components: { DashUser, DashRent }

}

</script>
<style>

</style>