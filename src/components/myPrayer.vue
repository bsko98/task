<template>
    <div class="container mt-5">
    <b-row class="align-items-center">
      <b-col></b-col>
      <b-col class="text-center">
        <h2 class="mt-5">기도 목록</h2>
      </b-col>
      <b-col class="text-right">
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
          border-variant="default"
          header-bg-variant="primary"
          header-text-variant="white"
        >
          <b-card-text  class="mb-4 mt-4" style="font-size: 1.1rem; min-height: 10vh;">
            {{ prayer.content }}
          </b-card-text>
          <b-button variant="outline-primary" size="sm" @click="moveToUpdatePage(prayer)" class="mx-4">수정하기</b-button>
          <b-button variant="danger" size="sm" @click="removePrayer(prayer)" class="mx-4">삭제하기</b-button>
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
        prayers: [],

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
          const response = await axios.get('http://localhost:8080/getMyPrayer');
          this.prayers = response.data;
          console.log(this.prayers)
        } catch (error) {
          console.error('Error fetching prayers:', error);
        }
      },
      moveToSavePage() {
        const router = this.$router; 
        router.push({path: '/savePrayer'});
      },
      moveToUpdatePage(prayer){
        console.log('id',prayer.id,'title: ',prayer.title,'content: ',prayer.content);
        this.$router.push({path: '/updatePrayer', state: {id: prayer.id, title: prayer.title, content:prayer.content}});
      },
      removePrayer(prayer){
        console.log('id',prayer.id,'title: ',prayer.title,'content: ',prayer.content);
      }
    },
  };
  </script>
  

<style scoped>


</style>