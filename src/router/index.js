import { createRouter, createWebHistory } from 'vue-router'
import savePrayer from '../components/savePrayer.vue';
import myPrayer from '../components/myPrayer.vue';
import updatePrayer from '../components/updatePrayer.vue';
import PrayerAssistant from '@/components/prayerAssistant.vue';
import PrayerAnalysisDashboard from '@/components/prayerAnalysisDashboard.vue';

const routes = [
    { path: '/', component:myPrayer},
    { path: '/savePrayer', component:savePrayer},
    { path: '/updatePrayer', component:updatePrayer},
    { path: '/prayerAssistant', component:PrayerAssistant},
    {path: '/prayerAnalysisDashboard', component:PrayerAnalysisDashboard}
]

// 라우터 생성
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;