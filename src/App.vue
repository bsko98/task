<template>
  <div id="app">
    <router-view />
    <MySidebar v-if="showSidebar"></MySidebar>
  </div>
</template>

<script>
import MySidebar from './components/sideBarComponent.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'App',
  components: {
    MySidebar,
  },
  setup() {
    const route = useRoute();
    // 로그인 페이지에서는 사이드바를 숨기기
    const showSidebar = computed(() => !['/loginPage', '/signUpPage'].includes(route.path));

    return {
      showSidebar
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
