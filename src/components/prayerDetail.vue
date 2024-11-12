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
                </b-form>
            </b-card>


            <!-- 댓글 입력창 -->
            <b-card class="shadow-sm mt-4">
                <b-form @submit.prevent="submitComment">
                    <b-form-group label="" label-for="commentInput">
                        <b-form-textarea
                            id="commentInput"
                            v-model="newComment"
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
                    <b-card-text>{{ comment.createdDate }}</b-card-text>
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
        comments: []
      };
    },
    created(){
      this.getPrayer();
      this.getComments();
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
      submitComment() {
        if (this.newComment) {
            const comment = {
                username: '사용자아이디', // 사용자 아이디는 실제 사용자 데이터로 대체 가능
                text: this.newComment,
                timestamp: new Date().toLocaleString()
            };
            this.comments.push(comment);
            this.newComment = '';
        }
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
       }
    }
}
</script>

<style>

</style>