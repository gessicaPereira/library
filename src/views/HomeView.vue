<template>
    <v-app>
        <v-row class="mt-1" justify="center">
        <v-main id="fundo">
            <v-container>
                <v-row>
                    <v-col>
                        <CardTotals></CardTotals>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <CardChart></CardChart>
                    </v-col>
                    <v-col>
                    <LastRegistration></LastRegistration>
                </v-col>
                </v-row>
            </v-container>
        </v-main>
        </v-row>
    </v-app>
</template>

<script>
import CardChart from '@/components/CardChart.vue';
import CardTotals from '@/components/CardTotals.vue';
import LastRegistration from '@/components/LastRegistration.vue';

export default {
    components: { CardChart, CardTotals, LastRegistration }

}

</script>
<style>

</style>