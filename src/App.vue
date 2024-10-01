<template>
  <div id="app">
    <router-view />
    <MySidebar></MySidebar>
  </div>
</template>

<script>
import MySidebar from './components/sideBarComponent.vue';


export default {
  name: 'App',
  components: {
    MySidebar,
  },
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
