<template>
  <v-row justify="center" class="mt-5">
      <apexchart id="chart" type="pie" v-if="!loading" width="500" ref="chart" :options="options" :series="series"></apexchart>
  </v-row>
</template>

<script>
import rent from '@/service/rent';
export default {
    name: 'CardChart',
    data() {
        return {
            loading: true,
            rents: [],
            series: [0, 0, 0],
            options: {
                chart: {
                    type: 'pie'
                },
                labels: ['Devolvido', 'Devovlvido com atraso', 'Em progresso'],
                title: {
                    text: 'Média de devoluções de livros'
                },
                noData: {
                    text: 'Carregando...'
                },
                animations: {
                    enabled: true
                },
                colors: ['#5AB55E', '#F55246', '#FEB019'],
                fill: {
                    colors: ['#5AB55E', '#F55246', '#FEB019']
                },
                dataLabels: {
                    formatter(val, opts) {
                        const name = opts.w.globals.labels[opts.seriesIndex];
                        return [name, val.toFixed(1) + '%'];
                    }
                },
                responsive: [
                    {
                        breakpoint: 720,
                        options: {
                            chart: {
                                width: 300
                            },
                            legend: {
                                position: 'center'
                            }
                        }
                    }
                ]
            }
        };
    },
    methods: {
        initialize() {
            rent.getAll().then(res => {
                this.rents = res.data.content;
                this.rents.forEach(a => {
                    if (a.return_date <= a.forecast_return) {
                        this.series[0]++;
                    }
                });
                this.rents.forEach(a => {
                    if (a.return_date == null) {
                        this.series[2]++;
                    }
                });
                this.rents.forEach(a => {
                    if (a.return_date > a.forecast_return) {
                        this.series[1]++;
                    }
                });
                this.loading = false;
            });
        }
    },
    created() {
        this.initialize();
    }
};
</script>
<style scoped>
#chart{
 background-color: white;
 margin-top: -35px;
}
</style>