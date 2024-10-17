<template>
    <div class="container p-4">
      <h1 class="text-2xl font-bold mb-4">주간 기도 분석 대시보드</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-white p-4 rounded shadow">
          <h2 class="text-lg font-semibold mb-2">총 기도 횟수</h2>
          <p class="text-4xl font-bold" v-if="totalPrayers">{{ totalPrayers }}</p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded shadow mb-4">
          <h2 class="text-lg font-semibold mb-2">상위 기도 주제</h2>
          <div class="h-60 ml-3">
            <Bar :data="chartData" :options="chartOptions" v-if="chartData"/>
          </div>
        </div>
        
        <div class="bg-white p-4 rounded shadow ml-4">
          <h2 class="text-lg font-semibold mb-2">요일별 기도 추이</h2>
          <div class="h-60 ml-3">
            <Bar :data="prayerTrendChartData" :options="chartOptions" />
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
        chartData: null,
        sampleData: {
          prayerTrend: [
            { day: "월", count: 20 },
            { day: "화", count: 25 },
            { day: "수", count: 18 },
            { day: "목", count: 30 },
            { day: "금", count: 22 },
            { day: "토", count: 15 },
            { day: "일", count: 28 }
          ],
          totalPrayers: null
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0
              }
            }
          }
        }
      }
    },
    computed: {
      prayerTrendChartData() {
        return {
          labels: this.sampleData.prayerTrend.map(item => item.day),
          datasets: [{
            label: '기도 횟수',
            data: this.sampleData.prayerTrend.map(item => item.count),
            backgroundColor: '#00AAFF'
          }]
        }
      }
    },
    mounted(){
      this.topPrayerTopicsChartData(),
      this.totalPrayersInWeek()
    },
    methods: {
      topPrayerTopicsChartData() {
        axios.get(`http://localhost:8080/ai/analysis`)
        .then(response => {
          console.log(response.data);
          const data = response.data
          const labels = Object.keys(data) // Map의 키값을 레이블로 변환
          const values = Object.values(data) // Map의 값을 데이터로 변환
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
    }
  }
  </script>