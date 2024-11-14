<template>
    <div class="container p-4">
      <h1 class="text-2xl font-bold mb-4">월간 기도 분석 대시보드</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-white p-4 rounded shadow">
          <h2 class="text-lg font-semibold mb-2">총 기도 횟수</h2>
          <p class="text-4xl font-bold" v-if="totalPrayers">{{ totalPrayers }}</p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded shadow mb-4">
          <h2 class="text-lg font-semibold mb-2">기도 카테고리</h2>
          <div class="h-60 ml-3">
            <Bar :data="chartData" v-if="chartData"/>
          </div>
              <div class="card mt-3">
                <div class="card-body">
                        <span class="mr-2">• </span>
                        <span v-if="recommendationText">{{ recommendationText }}</span>
                    </div>
                </div>
        </div>
        
        <div class="bg-white p-4 rounded shadow ml-4">
          <h2 class="text-lg font-semibold mb-2">기도 키워드</h2>
          <div class="h-60 ml-3">
            <Bar :data="prayerKeyword" :options="chartOptions" v-if="prayerKeyword"/>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div class="bg-white p-4 rounded shadow">
          <h2 class="text-lg font-semibold mb-2">추천 기도문</h2>
          <div
          class="d-flex flex-wrap justify-content-center"
          >   
        <div
            v-for="prayer in prayers"
            :key="prayer.id"
            cols="12"
            md="6"
            lg="4"
            class="mt-5 mb-5 d-flex justify-content-center"
          >
            <b-card
                no-body
                class="text-center shadow-lg prayer-card d-flex flex-column"
                style="width: 100%; max-width: 25rem; min-height: 15rem; margin-right: 1.5rem;"
                bg-variant="light"
                border-variant="default"
                header-bg-variant="primary"
                header-text-variant="white"
              >
              <b-card-header class="py-3">
                <h4 class="mb-0">{{ prayer.title }}</h4>
              </b-card-header>
                <b-card-body class="d-flex flex-column">
                  <b-card-text  class="mb-4 mt-4" style="font-size: 1.1rem; min-height: 10vh;">
                  {{ prayer.content }}
                </b-card-text>
                </b-card-body>  
              </b-card>
            </div>
          </div>
        </div>
      </div>

      </div>
    </div>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import axios from 'axios';

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'PrayerAnalysisDashboard',
    components: { Bar },
    data() {
      return {
        prayers: [],
        chartData: null,
        prayerKeyword: null,
        totalPrayers: null,
        recommendationText: '',
        chartOptions: {
          onClick:(event, elements)=>{
            if (elements.length > 0) {
              const chartElement = elements[0];
              const dataIndex = chartElement.index;
              const clickedValue = this.prayerKeyword.labels[dataIndex];
              if(confirm('해당 키워드가 포함된 기도를 보시겠습니까?')){
                this.$router.push({path: '/prayerWithKeyword', state: {keyword:clickedValue}});
              }
            }
          }
        }
      }
    },
    computed: {
    },
    mounted(){
      this.topPrayerTopicsChartData(),
      this.totalPrayersInWeek(),
      this.topPrayerKeywordsChartData(),
      this.recommendCategory(),
      this.chartOptions,
      this.getRecommendPrayer();
    },
    methods: {
      topPrayerTopicsChartData() {
        axios.get(`http://localhost:8080/ai/analysis`)
        .then(response => {
          console.log(response.data);
          const data = response.data
          const labels = Object.keys(data) 
          const values = Object.values(data) 
          this.chartData ={
          labels: labels,
          datasets: [{
            label: '기도 횟수',
            data: values,
            backgroundColor: '#00AAFF'
          }]
        }
        })
        .catch(error => {
          console.error("Error:", error);
        });
      },


      topPrayerKeywordsChartData() {
        axios.get(`http://localhost:8080/ai/analysisKeywords`)
        .then(response => {
          console.log(response.data);
          const data = response.data
          const labels = Object.keys(data) 
          const values = Object.values(data) 
          this.prayerKeyword ={
          labels: labels,
          datasets: [{
            label: '빈도수',
            data: values,
            backgroundColor: '#85c1e9'
          }]
        }
        })
        .catch(error => {
          console.error("Error:", error);
        });
      },


      totalPrayersInWeek() {
        axios.get(`http://localhost:8080/ai/totalPrayerInWeek`)
        .then(response => {
          console.log(response.data);
          console.log(response);
          this.totalPrayers = response.data

        })
        .catch(error => {
          console.error("Error:", error);
        });
      },

      recommendCategory(){
        axios.get(`http://localhost:8080/ai/getCategoryComment`)
        .then(response => {
          this.recommendationText = response.data

        })
        .catch(error => {
          console.error("Error:", error);
        });
      },

      getRecommendPrayer(){
        axios.get(`http://localhost:8080/getRecommendPrayer`)
        .then(response => {
          this.prayers = response.data
        })
        .catch(error => {
          console.error("Error:", error);
        });
      }


    }
  }
  </script>