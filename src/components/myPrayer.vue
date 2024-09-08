<template>
    <div class="container mt-5">
    <b-row class="align-items-center">
      <b-col cols="6" class="text-center">
        <h2 class="mt-5">기도 목록</h2>
      </b-col>
      <b-col cols="6" class="text-right">
        <b-button 
          @click="moveToSavePage()" 
          squared 
          type="submit" 
          variant="primary">
          기도 등록하기
        </b-button>
      </b-col>
    </b-row>
    
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
          :title="prayer.title"
          class="text-center shadow-lg"
          style="width: 100%; max-width: 25rem; min-height: 15rem;"
          bg-variant="light"
          border-variant="primary"
          header-bg-variant="primary"
          header-text-variant="white"
        >
          <b-card-text class="mb-4" style="font-size: 1.1rem;">
            {{ prayer.content }}
          </b-card-text>
          <b-button variant="outline-primary" size="sm">수정하기</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
  </template>
  

  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        prayers: [{id:1, title:'dsfs',content:'sdㅇㄴㄹㄴㅇㄹㅇㅎㅇㅎㅇㅀㅇㅀㄹ올홓롤헛ㅇㅅㄷ괓ㅎㄹㅇㄶ호촣ㅇㄴㅁㅇㄹㅇ호ㅓ'},{id:2, title:'dsfs',content:'sdfsdfds'},{id:3, title:'dsfs',content:'sdㅇㄴㄹㄴㅇㄹㅇㅎㅇㅎㅇㅀㅇㅀㄹ올홓롤헛ㅇㅅㄷ괓ㅎㄹㅇㄶ호촣ㅇㄴㅁㅇㄹㅇ호ㅓ'},{id:4, title:'dsfs',content:'sdfsdfds'}],

        fields: [
          { key: 'id', label: 'ID' },
          { key: 'title', label: '제목' },
          { key: 'content', label: '내용' },
        ],
      };
    },
    created() {
      this.fetchPrayers();
    },
    methods: {
      async fetchPrayers() {
        try {
          const response = await axios.get('http://localhost:8080/showMyPrayer');
          this.prayers = response.data;
          console.log(this.prayers)
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      },
      moveToSavePage() {
        const router = this.$router; 
        router.push({path: '/savePrayer'});
      },
    },
  };
  </script>
  

<style scoped>


</style>