<template>
      <div class="container mt-5">
    <b-row class="align-items-center">
      <b-col></b-col>
      <b-col class="text-center">
        <h2 class="mt-5" @click="moveToMyPrayer">그룹 기도 목록</h2>
      </b-col>
      <b-col class="text-right">
        <select v-model="selectedGroup" class="form-select" @change="getGroupPrayers">
              <option v-for="group in groups" :key="group.id" :value="group.groupName">
                {{ group.groupName }}
              </option>
        </select>
      </b-col>
    </b-row>
    
    <div v-if="loading" class="text-center mt-4">
    </div>

    <div v-else>
      <div class="container mt-5">
      <ul class="list-group mt-4">
        <li
          v-for="prayer in prayers"
          :key="prayer.id"
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          @click="goToDetail(prayer.id)"
        >
          <span>{{ prayer.title }}</span>
          <span class="text-muted">{{ prayer.userNickname }}</span>
        </li>
      </ul>
  
      <!-- 페이지네이션 -->
      <nav aria-label="Page navigation mt-4">
        <ul class="pagination justify-content-center mt-3">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">이전</a>
          </li>
          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: page === currentPage }"
          >
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">다음</a>
          </li>
        </ul>
      </nav>
    </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
export default {
  data() {
      return {
        groups:[
          
        ],
        prayers: [

        ],
        currentPage: 1,
      totalPages: 1, // 백엔드에서 전체 페이지 수를 가져와 설정할 예정
      prayersPerPage: 10, // 한 페이지에 보여줄 글 수
      };
    },
    created(){
      this.getGroups();
    },
    methods: {
      async getGroupPrayers() {
        console.log(this.selectedGroup)
        try {
          const response = await axios.get('http://localhost:8080/getGroupPrayerList',{
            params:{groupName: this.selectedGroup}
          });
          this.prayers = response.data;
          console.log(this.prayers)
        } catch (error) {
          console.error('Error fetching prayers:', error);
        }
      },

      async getGroups(){
        try {
          const response = await axios.get('http://localhost:8080/myGroup');
          this.groups = response.data;
          console.log(this.groups)
        } catch (error) {
          console.error('Error fetching groups:', error);
        }
      },

      moveToMyPrayer(){
        this.$router.push({path: '/myPrayerList'});
      },

      async getCount(){
      try {
          const response = await axios.get(`http://localhost:8080/getGroupPrayerCount`);
          this.totalPages = Math.ceil(response.data/this.prayersPerPage);
          console.log('몇 페이지노? ',this.totalPages);
      }catch (error) {
        console.error("Error fetching prayerCount:", error);
      }   
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
        console.log('현재 페이지: ',this.currentPage)
        this.getPrayer(this.currentPage); // 선택한 페이지의 데이터를 다시 가져옴
      }
    },
    goToDetail(id) {
      console.log('id값 췤: ',id)
      this.$router.push({path: '/prayerDetail', state: {id: id}});
    },

    }
}
</script>

<style>
select{
  width: 50% !important;
  margin-left: auto !important;
}
</style>