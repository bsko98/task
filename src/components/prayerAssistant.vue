<template>
  <div class="container mt-5">
    <b-card no-body class="card shadow-sm overflow-hidden prayer-card" align="center">
      <b-row no-gutters>
        <b-col md="12">
          <b-card-body class="mb-2" title="기도문 작성 어시스턴스">
            <b-form @submit.prevent="generatePrayer()">
              <b-form-group
                id="input-group-1"
                label="기도문 작성을 도와드려요🙏"
                label-for="input-1"
                class="mb-2"
              >
                <b-form-input
                  id="input-1"
                  v-model="input"
                  type="text"
                  placeholder="작성하고싶은 기도문을 구체적으로 적어주세요!"
                  required
                ></b-form-input>
              </b-form-group>
              <p>ex)감사를 위한 기도문을 작성해 주세요.</p>
              <b-button type="submit" variant="primary" class="mt-2 w-100">기도문 작성</b-button>
            </b-form>

            <b-card-text class="mt-4 flex-grow-1" v-if="prayer">
              <strong>생성된 기도문</strong>
              <p class="mt-4  prayer-text">{{ prayer }}</p>
              <p>필요하다면 기도문을 수정하세요</p>
              <b-button class = "mt-4" variant="success" @click="moveToSavePrayer">기도문 작성하기</b-button>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PrayerAssistant',
  data() {
    return {
      input: '',
      prayer: '',
    }
  },
  methods: {
    async generatePrayer() {
      try{
        let prayerObject = await axios.get(`http://localhost:8080/ai/generatePrayer`,
          {
            params: {
              message: this.input
            }
          }
        );
        this.prayer = prayerObject.data
      }
      catch(error){
        console.error('Error assistants prayers:', error);
        alert(error.response.data);
        this.$route.go();
      }
    },
    moveToSavePrayer(){
      console.log("기도문 작성 어시스턴스에서의 기도문: ",this.prayer)
      this.$router.push({path: '/savePrayer', state: {content:this.prayer}});
    }
  }
}
</script>

<style scoped>

.prayer-card {
  min-width: 700px;
  min-height: 450px;
}

.prayer-text {
  font-style: italic;
  color: #6c757d;
  margin-top: 10px;
}
</style>