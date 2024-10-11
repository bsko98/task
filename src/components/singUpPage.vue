<template>
    <div class="d-flex justify-content-center align-items-center">
      <div class="card p-4" style="width: 400px;">
        <h3 class="text-center mb-4">회원가입</h3>
        <b-form @submit.prevent="handleSubmit">
          <b-form-group label="아이디" label-for="nameInput">
            <b-form-input
              id="nameInput"
              type="text"
              v-model="name"
              placeholder="아이디"
              required
            />
          </b-form-group>
  
          <b-form-group label="비밀번호" label-for="passwordInput">
            <b-form-input
              id="passwordInput"
              type="password"
              v-model="password"
              placeholder="비밀번호"
              required
            />
          </b-form-group>
          
          <b-form-group label="닉네임" label-for="nicknameInput">
            <b-form-input
              id="nicknameInput"
              type="text"
              v-model="nickname"
              placeholder="닉네임"
              required
            />
          </b-form-group>

          <b-form-group label="Confirm Password" label-for="confirmPasswordInput">
            <b-form-input
              id="confirmPasswordInput"
              type="password"
              v-model="confirmPassword"
              placeholder="Confirm your password"
              required
            />
          </b-form-group>

          
  
          <b-button type="submit" variant="primary" block>회원가입</b-button>
        </b-form>
  
        <div class="text-center mt-3">
          <small>이미 계정이 있으신가요? <a href="/loginPage">로그인 페이지</a></small>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        nickname: '',
        password: '',
        confirmPassword: '',
      };
    },
    methods: {
      handleSubmit() {
        // 회원가입 처리 로직
        console.log("Name:", this.name, "nickname:", this.nickname, "Password:", this.password);
      },
    },
  };
  </script>
  
  <style scoped>
  .vh-100 {
    height: 100vh;
  }
  </style>