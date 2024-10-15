<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="login-box">
      <h2>로그인</h2>
      <form action="/login" method="post">
        <div class="input-group">
          <input
            type="text"
            v-model="username"
            placeholder="아이디"
            id="username" 
            name="username"
            required
          />
        </div>
        <div class="input-group">
          <input
            type="password"
            v-model="password"
            placeholder="비밀번호"
            id="password" 
            name="password"
            required
          />
        </div>
        <div class="input-group">
          <button type="submit" class="login">로그인</button>
        </div>
          <router-link to='/signUpPage'><button class="signup">회원가입</button></router-link>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-box {
  background: white;
  padding: 2rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 300px;
  text-align: center;
}

h2 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.input-group {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button{
  width: 100%;
  padding: 0.75rem;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.login {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.signup{
  background-color: #00ff11;
}

button:hover {
  background-color: #0056b3;
}
</style>
