<template>
    <div class="container mt-5"> 
      <h2 class="mt-5">게시글 목록</h2>
      <b-table :items="prayers" :fields="fields" striped hover></b-table>
      <b-button @click="moveToSavePage()" squared type="submit" variant="primary" block>기도 등록하기</b-button>
    </div>
  </template>
  

  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        prayers: [],
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
  