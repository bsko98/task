<template>
    <div class="d-flex justify-content-center align-items-center">
      <div class="card p-4" style="width: 400px;">
        <h3 class="text-center mb-4">회원가입</h3>
        <b-form @submit.prevent="handleSubmit">
          <b-form-group label="아이디" label-for="usernameInput">
            <b-form-input
              id="usernameInput"
              type="text"
              v-model="username"
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
              autoComplete="off" 
              required
            />
          </b-form-group>  

          <b-form-group label="비밀번호 확인" label-for="confirmPasswordInput">
            <b-form-input
              id="confirmPasswordInput"
              type="password"
              v-model="confirmPassword"
              placeholder="비밀번호 확인"
              autoComplete="off" 
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
          
  
          <b-button type="submit" variant="primary" block>회원가입</b-button>
        </b-form>
  
        <div class="text-center mt-3">
          <small>이미 계정이 있으신가요? <a href="/loginPage">로그인 페이지</a></small>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';

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
        if(this.password != this.confirmPassword){
          alert("비밀번호가 일치하지 않습니다.");
          return
        }
        // 회원가입 처리 로직
        console.log("userame:", this.username, "nickname:", this.nickname, "Password:", this.password, "confirmPassword: ",this.confirmPassword);

        axios.post("/signUp",{
          username: this.username,
          nickname: this.nickname,
          password: this.password
        })
        .then(() => {
          alert("회원가입을 완료했습니다.");
          this.$router.push({path: '/loginPage'}); // 상세 페이지로 이동
        })
        .catch(error => {
          console.error("회원가입 실패:", error);
          console.log();
          alert(error.response.data);
        });


      },
      
    },
  };
  </script>
  
  <style scoped>
  .vh-100 {
    height: 100vh;
  }
  </style>