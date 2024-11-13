<template>
    <div class="container mt-5">
        <h2 class="mt-5">{{ this.keyword }} 기도 목록</h2>
  
  <div v-if="loading" class="text-center mt-4">
  </div>

  <div v-else>
    <b-row class="mt-4">
      <b-col
        v-for="prayer in prayers"
        :key="prayer.id"
        cols="12"
        md="6"
        lg="4"
        class="mb-4 d-flex justify-content-center"
      >
        <b-card
          no-body
          class="text-center shadow-lg prayer-card"
          style="width: 100%; max-width: 25rem; min-height: 15rem;"
          bg-variant="light"
          border-variant="default"
          header-bg-variant="primary"
          header-text-variant="white"
        >
        <b-card-header class="py-3">
          <h4 class="mb-0">{{ prayer.title }}</h4>
        </b-card-header>
        <b-card-body class="d-flex flex-column">
          <b-card-text class="flex-grow-1 mb-4">
            {{ prayer.content }}
          </b-card-text>
        </b-card-body> 
        </b-card>
      </b-col>
    </b-row>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
data() {
    return {
      keyword: '',
      prayers: [

      ],
    };
  },
  created(){
    console.log(history.state)
    this.keyword = history.state.keyword,
    this.getPrayersWithKeyword()
  },
  methods: {
    async getPrayersWithKeyword() {
      console.log('키워드: ',this.keyword)
      axios.get(`http://localhost:8080/getPrayerContainKeyword/${this.keyword}`,
        {keyword : this.keyword}
      )
      .then(response => {
        console.log("그룹 불러오기 결과: ",response.data);
        this.prayers = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    },
  }
}
</script>

<style>
select{
width: 50% !important;
margin-left: auto !important;
}
</style>