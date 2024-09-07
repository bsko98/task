import { createApp } from 'vue'
import App from './App.vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import router from './router/index.js'

const app = createApp(App);
app.use(BootstrapVue3);
app.use(router)  // 라우터 사용
app.mount('#app');
