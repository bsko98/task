<template>
    <div class="container mt-5">
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
    
    <div v-if="loading" class="text-center mt-4">
      <b-spinner variant="primary" style="width: 4rem; height: 4rem;"></b-spinner>
      <p class="mt-3 text-muted">기도 목록을 불러오는 중...</p>
    </div>

    <div v-else>
      <b-row class="mt-4">
        <b-col
          v-for="prayer in prayers"
          :key="prayer.id"
          cols="12"
          md="6"
          lg="4"
          class="mb-4 d-flex justify-content-center"
        >
          <b-card
            no-body
            class="text-center shadow-lg prayer-card d-flex flex-column"
            style="width: 100%; max-width: 25rem; min-height: 15rem;"
            bg-variant="light"
            border-variant="default"
            header-bg-variant="primary"
            header-text-variant="white"
          >
          <b-card-header class="py-3">
            <h4 class="mb-0">{{ prayer.title }}</h4>
          </b-card-header>
          <b-card-body class="d-flex flex-column">
            <b-card-text class="flex-grow-1 mb-4">
              {{ prayer.content }}
            </b-card-text>
          </b-card-body>
            <div class="mt-auto">
              <b-button-group class="w-100">
                <b-button variant="outline-primary" size="sm" @click="moveToUpdatePage(prayer)" class="mx-4">수정하기</b-button>
                <b-button variant="danger" size="sm" @click="removePrayer(prayer)" class="mx-4">삭제하기</b-button>
              </b-button-group>
            </div>  
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
  </template>
  

  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        prayers: [{id:1,title:'sdfsdf',content:'sdfsdfsf'},{id:2,title:'sdfsdf',content:'sdfsfuyghjhhjfassadasdasfassdfdsdfsfsdfsfuyghjhhjfassadasdasfassdfdsdfsfsdfsfuyghjhhjfassadasdasfassdfdsdfsfsdfsfuyghjhhjfassadasdasfassdfdsdfsfsdfsfuyghjhhjfassadasdasfassdfdsdfsfsdfsfuyghjhhjfassadasdasfassdfdsdfsfsdfsfuyghjhhjfassadasdasfassdfdsdfsfsdfsfuyghjhhjfassadasdasfassdfdsdfsfsdfsfuyghjhhjfassadasdasfassdfdsdfsf'}],
        loading: true, // 로딩 상태
      };
    },
    created() {
      this.getPrayers();
    },
    methods: {
      async getPrayers() {
        try {
          const response = await axios.get('http://localhost:8080/getMyPrayer');
          this.prayers = response.data;
          console.log(this.prayers)
        } catch (error) {
          console.error('Error fetching prayers:', error);
        }
        finally {
          this.loading = false; // 로딩 완료
        }
      },
      moveToSavePage() {
        const router = this.$router; 
        router.push({path: '/savePrayer'});
      },
      moveToUpdatePage(prayer){
        console.log('id',prayer.id,'title: ',prayer.title,'content: ',prayer.content);
        this.$router.push({path: '/updatePrayer', state: {id: prayer.id, title: prayer.title, content:prayer.content, isPrivate:prayer.isPrivate}});
      },
      removePrayer(prayer){
        console.log('id',prayer.id,'title: ',prayer.title,'content: ',prayer.content);
        if (confirm("삭제하시겠습니까?")) {
        axios
          .patch(`http://localhost:8080/deletePrayer/${prayer.id}`,prayer)
          .then(() => {
            console.log('삭제되었습니다.');
            alert('삭제되었습니다.');
            this.getPrayers();
          })
          .catch((error) => {
            console.error("Error deleting:", error);
          });
        }
      },
      moveToGroupPrayer(){
        this.$router.push({path: '/groupPrayer'});
      }
    },
  };
  </script>
  

<style scoped>
.prayer-card:hover {
  transform: translateY(-8px); /* 마우스 호버 시 카드가 살짝 올라오는 효과 */
  transition: transform 0.3s ease-in-out; /* 부드러운 변환 효과 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 진하게 */
}

</style>