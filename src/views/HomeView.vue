<template>
  <v-container id="dashPage">
      <v-row>
          <v-col>
              <v-card rounded="xl" elevation="7" id="book">
                  <v-card-title
                      >Livros
                      <v-spacer></v-spacer>
                      <v-btn rounded to="/books" dark>
                          <v-icon>fa-solid fa-book</v-icon>
                      </v-btn>
                  </v-card-title>

                  <v-card-text class="font-weight-black">
                        <v-chip>
                            {{ books.length }}
                        </v-chip>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>

              <v-card rounded="xl" elevation="7" id="publishing">
                    <v-card-title
                        >Editoras
                        <v-spacer></v-spacer>
                        <v-btn rounded to="/publishing" dark>
                            <v-icon>fa-solid fa-feather</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text class="font-weight-black">
                        <v-chip>
                            {{ publishing.length }}
                        </v-chip>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>

            <v-card rounded="xl" elevation="7" id="user">
                    <v-card-title
                        >Leitores
                        <v-spacer></v-spacer>
                        <v-btn rounded to="/users" dark>
                            <v-icon>fa-solid fa-user</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text class="font-weight-black">
                        <v-chip>
                            {{ users.length }}
                        </v-chip>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>

              <v-card rounded="xl" elevation="7" id="rent">
                    <v-card-title
                        >Aluguéis
                        <v-spacer></v-spacer>
                        <v-btn rounded to="/rents" dark>
                            <v-icon>fa-solid fa-bookmark</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text class="font-weight-black">
                        <v-chip>
                            {{ rent.length }}
                        </v-chip>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>

          <v-col>
                <v-card rounded="xl" elevation="7" id="mostRent">
                    <v-card-title>Os Livros Mais Alugados</v-card-title>
                    <v-card-text>
                        <Doughnut
                            :chart-options="chartOptions"
                            :chart-data="chartData"
                            :chart-id="chartId"
                            :dataset-id-key="datasetIdKey"
                            :width="width"
                            :height="height"
                        />
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
              <v-card rounded="xl" elevation="7" height="380" dark id="info">
                    <v-card-title
                        >Último livro alugado
                        <v-spacer></v-spacer>
                        <v-icon size="50">fa-solid fa-book</v-icon>
                    </v-card-title>
                    <v-card-text class="font-weight-black">
                        <v-row>
                            <v-col>Nome do livro: {{ rents[0].book.name }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col>Nome do leitor: {{ rents[0].user.name }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col>Data em que alugou: {{ rentDate }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col>Data de previsão de entrega: {{ rentPredict }}</v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import books from '@/service/books';
import publishing from '@/service/publishing';
import rent from '@/service/rent';
import users from '@/service/users';
import moment from 'moment';
import { Doughnut } from 'vue-chartjs/legacy';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default{
  name: 'DoughnutChart',
    components: { Doughnut },
    props: {
        chartId: {
            type: String,
            default: 'doughnut-chart'
        },
        datasetIdKey: {
            type: String,
            default: 'label'
        },
        width: {
            type: Number,
            default: 300
        },
        height: {
            type: Number,
            default: 300
        }
    },

    data: () => ({
        book: [],
        user: [],
        publishing: [],
        rents: [],

        firstRented: [],
        secondRented: [],
        thirtRented: [],
        rental_date: '',
        forecast_return: '',

        chartData: {
            labels: [],
            datasets: [
                {
                    backgroundColor: ['#FF0000', '#FFFF00', '#FF4500'],
                    data: []
                }
            ]
        },
        chartOptions: {
            responsive: true,
            maintainAspectRatio: false
        }
    }),

    methods: {
        async updateDash() {
            await books.getAllBooks()
                .then((response) => {
                    this.book = response.data.content;
                    console.log(this.book);
                    this.firstRented = this.book.at(-1);
                    this.secondRented = this.book.at(-2);
                    this.thirtRented = this.book.at(-3);
                    this.getFirstRent();
                    this.getSecondRent();
                    this.getThirtRent();
                })
                .then(() => {
                    this.updateGraphic();
                }),
                publishing.getAllPublishers().then((response) => {
                    this.publishing = response.data.content;
                }),
                rent.getAllRents().then((response) => {
                    this.rents = response.data.content;
                    this.rental_date = moment(this.rents[0].rental_date).subtract(1, 'months').format('DD/MM/YYYY');
                    this.forecast_return = moment(this.rents[0].forecast_return).subtract(1, 'months').format('DD/MM/YYYY');
                }),
                users.getAllUsers().then((response) => {
                    this.user = response.data.content;
                });
        },
      },
      updateGraphic() {
            this.book.sort((a, b) => a.leaseQuantity - b.leaseQuantity);
        },
        getFirstRent() {
            this.chartData.labels.unshift(this.firstRented.name);
            this.chartData.datasets[0].data.push(this.firstRented.leaseQuantity);
        },
        getSecondRent() {
            this.chartData.labels.unshift(this.secondRented.name);
            this.chartData.datasets[0].data.push(this.secondRented.leaseQuantity);
        },
        getThirtRent() {
            this.chartData.labels.push(this.thirtRented.name);
            this.chartData.datasets[0].data.push(this.thirtRented.leaseQuantity);
        },

    mounted() {
        this.updateDash();
    }
};

</script>
            