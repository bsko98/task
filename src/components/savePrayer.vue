<template>
  <b-container class="py-5">
    <b-row class="justify-content-center">
      <b-col cols="12" lg="8" xl="7">
        <b-card class="shadow-sm prayer-card">
          <h1 class="text-center">기도 제목</h1>
          <b-form @submit.prevent="submitPrayer" class="mt-5">
            <b-form-group label="제목" label-for="title">
              <b-form-input
                id="title"
                v-model="title"
                required
                placeholder="기도 제목을 입력하세요"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="내용" label-for="content">
              <b-form-textarea
                id="content"
                v-model="content"
                required
                placeholder="기도 내용을 입력하세요"
                rows="5"
              ></b-form-textarea>
            </b-form-group>
            <div style="text-align: left !important;" class="mb-3">
              <b-form-checkbox
                id="isPublic"
                v-model="isPublic"
                name="checkbox-1"
                value="true"
                unchecked-value="false" 
              >
                공개
              </b-form-checkbox>
            </div>
            <b-button squared type="submit" variant="primary" block>등록하기</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';

export default {
  created(){
      console.log(history.state.content)
      this.content = history.state.content;
    },
  data() {
    return {
      prayer: {
        title: '',
        content: '',
        isPublic: false
      }
    };
  },
  methods: {
    submitPrayer() {
        console.log(this.title,this.content,this.isPublic)
        if(this.isPublic === undefined){
          this.isPublic = false
        }
        console.log(this.title,this.content,this.isPublic)
        axios.post('http://localhost:8080/saveMyPrayer',{
          title:this.title,
          content: this.content,
          isPublic: this.isPublic
        })
        .then(() => {
          alert("기도 등록 완료했습니다.");
          this.$router.push({path: '/myPrayer'});
        })
        .catch(error => {
          console.error("기도등록 실패:", error);
          alert(error.response.data);
        });
    },
  }
};
</script>

<style scoped>
.prayer-card {
border-radius: 20px;
padding: 2rem;
}
</style>
