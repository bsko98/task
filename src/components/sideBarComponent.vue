<template>
  <div class="icon-bar">
    <router-link to='/'><font-awesome-icon icon="house" /></router-link>
    <br/>
    <router-link to='/prayerAssistant'><font-awesome-icon icon="fa-solid fa-person-praying" /></router-link>
     
  </div>
</template>
  
  <script>
  export default {
    name: 'MySidebar',
  };
  </script>
  
  <style scoped>
  .icon-bar {
    height: 100%;
    width: 5%;
    background-color: #555;
    position: fixed; /* Fixed Sidebar (stay in place on scroll) */
    /*z-index: 1;*/ /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 0;
  }

  .icon-bar a {
    display: block;
    text-align: center;
    padding: 16px;
    transition: all 0.3s ease;
    color: white;
    font-size: 36px;

  }

  .icon-bar a:hover {
    background-color: #858585;
  }

  .active {
    background-color: #5eaf13;
  }
  </style>
  