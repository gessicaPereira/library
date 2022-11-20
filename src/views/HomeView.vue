<template>
    <v-app>
        <v-main id="fundo">
            <v-container>
                <v-row>
                        <CardChart></CardChart>
                        <CardTotals></CardTotals>  
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import CardChart from '@/components/CardChart.vue';
import CardTotals from '@/components/CardTotals.vue';

export default {
    components: { CardChart, CardTotals }

}

</script>
<style>

</style>