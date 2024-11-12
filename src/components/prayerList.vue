<template>
    <div class="container">
      <h1>관리자 페이지</h1>
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
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        prayers: [],
        currentPage: 1,
        totalPages: 1, // 백엔드에서 전체 페이지 수를 가져와 설정할 예정
        prayersPerPage: 10, // 한 페이지에 보여줄 글 수
      };
    },
    methods: {
      async fetchPrayer(page) {
        try {
          // 백엔드에서 페이지네이션된 데이터를 가져오는 API 호출
          const response = await axios.get(`http://localhost:8080/admin/getAllUserPrayer`, {
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
            const response = await axios.get(`http://localhost:8080/admin/getAllUserPrayerCount`);
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
          this.fetchPrayer(this.currentPage); // 선택한 페이지의 데이터를 다시 가져옴
        }
      },
      goToDetail(id) {
        console.log('id값 췤: ',id)
        this.$router.push({path: '/prayerDetail', state: {id: id}});
      },
    },
    created() {
      // 컴포넌트가 로드될 때 첫 페이지 데이터를 가져옴
      this.fetchPrayer(this.currentPage);
      this.getCount();
    },
  };
  </script>
  
  <style>
  .container {
    margin-top: 20px;
  }
  </style>
  