<template>
  <div class="icon-bar">
    <router-link to='/myPrayer'><font-awesome-icon icon="house" /></router-link>
    <br/>
    <router-link to='/prayerAssistant'><font-awesome-icon icon="fa-solid fa-person-praying" /></router-link>
    <br/>
    <router-link to='/prayerAnalysisDashboard'><font-awesome-icon icon="chart-simple" /></router-link> 
    <br/>
    <router-link to='/groupPage'><font-awesome-icon icon="user-group" /></router-link> 
    <br/>
    <router-link to='/prayerList'><font-awesome-icon icon="database" /></router-link> 
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <form action="/logout" method="post" class="logout-form">
      <input type="submit" value="로그아웃" class="logout-button"/>
    </form>
      

    
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
  .logout-button {
  background-color: #d9534f;
  border: none;
  color: white;
  padding: 6px 12px;  /* 작게 조정된 패딩 */
  font-size: 10px;  /* 폰트 크기 축소 */
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s;
  width: 90%;  /* 아이콘 바 내에서 적절한 너비 */
}

.logout-button:hover {
  background-color: #c9302c;
  transform: scale(1.03);
}

.logout-button:active {
  background-color: #ac2925;
  transform: scale(0.95);
}
  </style>
  