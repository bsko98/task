import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios';
import savePrayer from '../components/savePrayer.vue';
import myPrayer from '../components/myPrayer.vue';
import updatePrayer from '../components/updatePrayer.vue';
import PrayerAssistant from '@/components/prayerAssistant.vue';
import PrayerAnalysisDashboard from '@/components/prayerAnalysisDashboard.vue';
import loginPage from '@/components/loginPage.vue';
import SingUpPage from '@/components/singUpPage.vue';
import GroupPage from '@/components/groupPage.vue';
import GroupPrayer from '@/components/groupPrayer.vue';
import PrayerWithKeyword from '@/components/prayerWithKeyword.vue';
import PrayerList from '@/components/prayerList.vue';
import PrayerDetail from '@/components/prayerDetail.vue';
import MyPrayerList from '@/components/myPrayerList.vue';



const routes = [
    { path: '/', redirect: '/myPrayerList'},
    { path: '/myPrayer', component:myPrayer},
    { path: '/myPrayerList', component:MyPrayerList},
    { path: '/savePrayer', component:savePrayer},
    { path: '/updatePrayer', component:updatePrayer},
    { path: '/prayerAssistant', component:PrayerAssistant},
    { path: '/prayerAnalysisDashboard', component:PrayerAnalysisDashboard},
    { path: '/loginPage', name: 'login', component:loginPage},
    { path: '/signUpPage', component: SingUpPage},
    { path: '/groupPage', component:GroupPage},
    { path: '/groupPrayer', component:GroupPrayer},
    { path: '/prayerWithKeyword', component:PrayerWithKeyword},
    { path: '/prayerList', component:PrayerList, meta: { requiresAdmin: true }},
    { path: '/prayerDetail', component: PrayerDetail}
]

// 라우터 생성
const router = createRouter({
    history: createWebHistory(),
    routes
});

//uesr 권한을 가져옴
async function fetchUserInfo() {
    try {
      const response = await axios.get('/getUserAuth');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user auth:', error);
      return null;
    }
  }


  //router가 작동할 때 권한 체크
  router.beforeEach(async (to, from, next) => {
    // 관리자 권한이 필요한 페이지인지 확인
    if (to.meta.requiresAdmin) {
      const userInfo = await fetchUserInfo();
        console.log('권한은??? : ', userInfo)


      if (userInfo && userInfo.includes('ROLE_ADMIN')) {
        next(); // ROLE_ADMIN 권한이 있다면 해당 페이지로 이동
      } else {
        alert('관리자 권한이 필요합니다.');
        next({ path: '/' }); // ROLE_ADMIN 권한이 없으면 홈 페이지로 리다이렉트
      }
    } else {
      next(); // 권한이 필요 없는 페이지는 그냥 이동
    }
  });


export default router;