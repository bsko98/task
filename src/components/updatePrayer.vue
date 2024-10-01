<template>
    <b-container>
      <b-row class="justify-content-center">
        <b-col md="6">
          <h1 class="text-center">기도 제목</h1>
          <b-form @submit.prevent="updatePrayer">
            <b-form-group label="제목" label-for="title">
              <b-form-input
                id="title"
                v-model="prayer.title"
                required
                placeholder="기도 제목을 입력하세요"
              ></b-form-input>
            </b-form-group>
  
            <b-form-group label="내용" label-for="content">
              <b-form-textarea
                id="content"
                v-model="prayer.content"
                required
                placeholder="기도 내용을 입력하세요"
                rows="5"
              ></b-form-textarea>
            </b-form-group>
            <b-button squared type="submit" variant="primary" block>수정하기</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        prayer: {
          title: '',
          content: ''
        }
      };
    },
    methods: {
      getPrayer() {
      const prayerId = history.state.id;
      axios.get(`http://localhost:8080/getPrayerById/${prayerId}`)
        .then(response => {
          this.prayer = response.data;
          console.log(this.prayer);
        })
        .catch(error => {
          console.error("Error fetching post:", error);
        });
      },
      updatePrayer() {
      console.log(this.prayer)
      const prayerId = history.state.id;
      axios.put(`http://localhost:8080/updatePrayer/${prayerId}`, this.prayer)
        .then(() => {
          alert("수정 완료했습니다.");
          this.$router.push({path: '/'}); // 상세 페이지로 이동
        })
        .catch(error => {
          console.error("Error updating prayer:", error);
          alert("실패");
        });
      },
    },
    created(){
      console.log(history.state)
      this.title = history.state.title;
      this.content = history.state.content;
      this.id = history.state.id;
      this.getPrayer();
    }
  };
  </script>
  
  <style>


  </style>
  