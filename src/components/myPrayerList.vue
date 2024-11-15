<template>
    <div class="container">
      <b-row class="align-items-center">
      <b-col></b-col>
      <b-col class="text-center">
        <h2 class="mt-5" @click="moveToGroupPrayer">내 기도 목록</h2>
      </b-col>
      <b-col class="text-right">
        <b-button 
          @click="moveToSavePage()" 
          squared 
          type="submit" 
          variant="primary">
          기도 등록하기
        </b-button>
      </b-col>
    </b-row>
        <h2 class="mt-5">이번 주 인기 기도 목록</h2>
        <div
          class="d-flex flex-wrap justify-content-center"
        >   
        <div
            v-for="prayer in prayersOfWeek"
            :key="prayer.id"
            cols="12"
            md="6"
            lg="4"
            class="mt-5 mb-5 d-flex justify-content-center"
          >
            <b-card
                no-body
                class="text-center shadow-lg prayer-card d-flex flex-column"
                style="width: 100%; max-width: 25rem; min-height: 15rem; margin-right: 1.5rem;"
                bg-variant="light"
                border-variant="default"
                header-bg-variant="primary"
                header-text-variant="white"
              >
              <b-card-header class="py-3">
                <h4 class="mb-0">{{ prayer.title }}</h4>
              </b-card-header>
                <b-card-body class="d-flex flex-column">
                  <b-card-text  class="mb-4 mt-4" style="font-size: 1.1rem; min-height: 10vh;">
                  {{ prayer.content }}
                </b-card-text>
                <b-card-text  class="mb-4 mt-4" style="font-size: 1.1rem; min-height: 5vh;">
                  {{ prayer.userNickname }}
                </b-card-text>
                </b-card-body>  
              </b-card>
            </div>
        </div>

      <ul class="list-group mt-4">
        <li
          v-for="prayer in prayers"
          :key="prayer.id"
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          @click="goToDetail(prayer.id)"
        >
          <span>{{ prayer.title }}</span>
        </li>
      </ul>
  
      <!-- 페이지네이션 -->
      <nav aria-label="Page navigation mt-5">
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
  </template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      prayers: [],
      prayersOfWeek: [],
      currentPage: 1,
      totalPages: 1, // 백엔드에서 전체 페이지 수를 가져와 설정할 예정
      prayersPerPage: 10, // 한 페이지에 보여줄 글 수
    };
  },
  methods: {
    async getPrayer(page) {
      try {
        // 백엔드에서 페이지네이션된 데이터를 가져오는 API 호출
        const response = await axios.get(`http://localhost:8080/getMyPrayerList`, {
          params: {
            page: page-1, // 요청하는 페이지 번호
            size: this.prayersPerPage, // 페이지당 글 수
          },
        });
        
        // 응답에서 데이터와 전체 페이지 수를 추출
        this.prayers = response.data // 예시: { posts: [{ id, title, username }], totalPages: 10 }
        console.log('전체 데이터: ',response.data)
      } catch (error) {
        console.error("Error fetching prayer:", error);
      }
    },
    async getCount(){
      try {
          const response = await axios.get(`http://localhost:8080/getMyPrayerCount`);
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
    moveToGroupPrayer(){
        this.$router.push({path: '/groupPrayer'});
    },
    getPrayerOfWeek(){
    axios.get(`http://localhost:8080/getPrayerOfWeek`)
        .then(response => {
          this.prayersOfWeek = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  },
  created() {
    // 컴포넌트가 로드될 때 첫 페이지 데이터를 가져옴
    this.getPrayer(this.currentPage);
    this.getCount();
    this.getPrayerOfWeek();
  },
};
</script>

<style>
.container {
  margin-top: 20px;
}
</style>