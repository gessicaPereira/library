<template>
    <div class="grafico" style="border: 1px solid #004d40">
      <apexchart height="400" type="bar" :options="chartOptions" :series="series"></apexchart>
    </div>
  </template>
  
  <script>
import booksService from '@/service/booksService';

export default {
    name: "LastRegistration",
    data: () => {
      return {
        loading: true,
        user: [],
        publishing: [],
        books: [],
        rents: [],
        chartSet: [],
        chartOptions: {
          chart: {
            name: "BarChart",
            zoom: false,
            height: "auto",
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              columnWidth: "90%",
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            position: "top",
            fontSize: "14px",
            fontFamily: "Helvetica, Arial",
            fontWeight: 500,
  
            markers: {
              fillColors: ["#9370DB", "#FFA07A", "#87CEFA"],
            },
  
            itemMargin: {
              horizontal: 10,
              vertical: 20,
            },
          },
          stroke: {
            show: true,
            width: 20,
            colors: ["transparent"],
          },
          title: {
            text: "Últimos livros cadastrados",
            style: {
              fontSize: "16px",
              color: "#000",
            },
          },
          fill: {
            colors: ["#9370DB", "#FFA07A", "#87CEFA"],
          },
          xaxis: {
            type: "category",
            categories: [""],
  
            axisBorder: {
              show: true,
              color: "#004D40",
              height: 1,
              width: "100%",
              offsetX: 0,
              offsetY: 0,
            },
          },
        },
        series: [
          {
            name: "",
            data: [0, 0, 0],
          },
        ],
      };
    },
    mounted() {
      this.updateChart();
    },
    methods: {
      updateChart() {
        booksService.getAll().then((res) => {
          this.books = res.data.content;
          this.chartSet = this.books;
          this.xaxis = {
            categories: ["Quantidade Total"],
          };
          this.series = [
            {
              name: this.chartSet[0].name,
              data: [this.chartSet[0].quantity],
            },
            {
              name: this.chartSet[1].name,
              data: [this.chartSet[1].quantity],
            },
            {
              name: this.chartSet[2].name,
              data: [this.chartSet[2].quantity],
            },
          ];
        });
      },
    },
  };
  </script>
  <style scoped>
  .grafico {
    display: inline-block;
    width: 400px;
    position: relative;
    bottom: 20px;
    margin: 60px 0 0 70px;
    padding: 10px;
    padding-bottom: 0px;
    border-radius: 10px;
  }

  </style>