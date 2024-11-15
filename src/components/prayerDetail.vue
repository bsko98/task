<template>
<b-container class="py-5">
    <b-row class="justify-content-center">
        <b-col cols="12" lg="8" xl="7">
            <b-card class="shadow-sm prayer-card">
                <h1 class="text-center">기도 제목</h1>
                <b-form class="mt-5">
                    <b-form-group label="제목" label-for="title">
                        <b-form-input
                            id="title"
                            v-model="prayer.title"
                            readonly
                            disabled
                            placeholder="기도 제목을 입력하세요"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group label="내용" label-for="content">
                        <b-form-textarea
                            id="content"
                            v-model="prayer.content"
                            readonly
                            disabled
                            placeholder="기도 내용을 입력하세요"
                            rows="5"
                        ></b-form-textarea>
                    </b-form-group>
                    <div class="d-flex justify-content-center flex-column align-items-center mt-2">              
                        <span class="ml-2 mt-3">{{ likes }} 함께 기도하기</span>
                        <b-button variant="outline-primary" class="mt-3" @click="likePrayer"><font-awesome-icon icon="hands-praying" /></b-button>
                    </div>
                    <div class="mt-5">
                      <b-button-group class="w-100">
                        <b-button variant="outline-primary" size="sm" @click="moveToUpdatePage(prayer)" class="mx-4">수정하기</b-button>
                        <b-button variant="danger" size="sm" @click="removePrayer(prayer)" class="mx-4">삭제하기</b-button>
                      </b-button-group>
                    </div>
                </b-form>
            </b-card>


            <!-- 댓글 입력창 -->
            <b-card class="shadow-sm mt-4">
                <b-form @submit.prevent="saveComment">
                    <b-form-group label="" label-for="commentInput">
                        <b-form-textarea
                            id="commentInput"
                            v-model="commentInput"
                            placeholder="댓글을 입력하세요"
                            required
                        ></b-form-textarea>
                    </b-form-group>
                    <b-button type="submit" variant="primary">등록</b-button>
                </b-form>
            </b-card>

            <!-- 등록된 댓글 목록 -->
            <b-card class="shadow-sm mt-4" v-for="(comment, index) in comments" :key="index">
                <div class="d-flex flex-column align-items-center justify-content-center text-center" style="height: 100%;">
                    <span><strong>{{ comment.username }}</strong></span>
                    <small class="text-muted">{{ comment.content }}</small>
                    <b-card-text>{{ comment.createdDateTime }}</b-card-text>
                    <b-button
                      variant="danger"
                      size="sm"
                      class="mt-2"
                      @click="deleteComment(comment)"
                    >
                      삭제
                    </b-button>
                </div>
            </b-card>
        </b-col>
    </b-row>
</b-container>

</template>

<script>
  import axios from 'axios';

export default {
    data() {
      return {
        prayer: {
          title: '',
          content: '',
          isPublic: ''
        },
        comments: [],
        likes: 0,     
      };
    },
    created(){
      this.getPrayer();
      this.getComments();
      this.getLikes();
    },
    methods: {
      getPrayer() {
      const prayerId = history.state.id;
      console.log('아이디 값 테스트: ',prayerId)
      axios.get(`http://localhost:8080/getPrayerById/${prayerId}`)
        .then(response => {
          this.prayer = response.data;
          this.checkPrivate = response.data.isPublic;
          console.log(response.data);
        })
        .catch(error => {
          console.error("Error:", error);
        });
      },
       getComments(){
        const prayerId = history.state.id;
      console.log('아이디 값 테스트: ',prayerId)
      axios.get(`http://localhost:8080/getComments/${prayerId}`)
        .then(response => {
          this.comments = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.error("Error:", error);
        });
       },
       saveComment(){
        console.log(this.commentInput)
        
        const prayerId = history.state.id;
        
        axios.post(`http://localhost:8080/saveComment/${prayerId}`,{
          prayerId: prayerId,
          content: this.commentInput
        })
        .then(() => {
          alert("댓글 등록 완료했습니다.");
          this.$router.go(0);
        })
        .catch(error => {
          console.error("등록 실패:", error);
          alert(error.response.data);
        });
       },
       deleteComment(comment){
        console.log(comment)
        const id= comment.id
        if (confirm("삭제하시겠습니까?")) {
          axios.delete(`http://localhost:8080/deleteComment/${id}`)
          .then(() => {
            console.log('삭제되었습니다.');
            alert('삭제되었습니다.');
            this.$router.go(0);
          })
          .catch((error) => {
            console.error("Error deleting:", error);
            alert(error.response.data);
          });
        }
      },
      likePrayer(){
        console.log('좋아요 기능 구현')
        const prayerId = history.state.id;

          axios.post(`http://localhost:8080/likePost/${prayerId}`)
          .then(() => {
            this.$router.go(0);
          })
          .catch(error => {
            console.error("좋아요 실패:", error);
            alert(error.response.data);
          });
        
      },
      getLikes(){
        const prayerId = history.state.id;
        console.log('좋아요 갯수 확인')
        axios.get(`http://localhost:8080/getLikeCount/${prayerId}`)
        .then(response => {
          this.likes = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.error("Error:", error);
        });
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
    }
}
</script>

<style>

</style>