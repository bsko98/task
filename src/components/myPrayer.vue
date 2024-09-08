<template>
    <div class="container mt-5"> 
      <h2 class="mt-5">게시글 목록</h2>
      <b-row class="d-flex flex-column align-items-center" style="min-height: 80vh;">
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
          class="text-center"
          style="width: 100%; max-width: 20rem;"
        >
          <b-card-text>
            {{ prayer.content }}
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
      <b-button @click="moveToSavePage()" squared type="submit" variant="primary" block>기도 등록하기</b-button>
    </div>
  </template>
  

  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        prayers: [{id:1, title:'dsfs',content:'sdfsdfds'},{id:2, title:'dsfs',content:'sdfsdfds'}],
        /*newPost: {
          title: '',
          content: '',
        },*/
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
        const router = this.$router; // this를 통해 router에 접근
        router.push({path: '/savePrayer'}); // 상세 페이지로 이동
      },
    },
  };
  </script>
  