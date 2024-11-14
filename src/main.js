import { createApp } from 'vue'
import App from './App.vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import router from './router/index.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPersonPraying,faHouse, faChartSimple,faDoorOpen,faUserGroup, faDatabase, faHandsPraying} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPersonPraying, faHouse, faChartSimple,faDoorOpen,faUserGroup,faDatabase,faHandsPraying)


const app = createApp(App);
app.use(BootstrapVue3);
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)  // 라우터 사용
app.mount('#app');
