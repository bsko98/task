<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col md="6">
        <h1 class="text-center">기도 제목</h1>
        <b-form @submit.prevent="submitPrayer">
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

          <b-button squared type="submit" variant="primary" block>등록하기</b-button>
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
    async submitPrayer() {
      try {
        console.log(this.prayer)
        const response = await axios.post('http://localhost:8080/saveMyPrayer', this.prayer);
        console.log('기도 등록 완료:', response.data);
        alert("기도를 등록했습니다.");
        this.$router.push({path: '/'}); // 상세 페이지로 이동
      } catch (error) {
        console.error('기도 등록 실패:', error);

      }
    }
  }
};
</script>

<style>
/* 추가 스타일이 필요하다면 작성하세요 */
</style>
