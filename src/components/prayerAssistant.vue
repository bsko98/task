<template>
  <div class="container mt-5">
    <b-card no-body class="overflow-hidden prayer-card" align="center">
      <b-row no-gutters>
        <b-col md="12">
          <b-card-body title="기도문 작성 어시스턴스">
            <b-form @submit.prevent="generatePrayer()">
              <b-form-group
                id="input-group-1"
                label="기도문 작성을 도와드려요🙏"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="input"
                  type="text"
                  placeholder="작성하고싶은 기도문을 구체적으로 적어주세요!"
                  required
                ></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="primary" class="mt-2">기도문 작성</b-button>
            </b-form>

            <b-card-text class="mt-3 flex-grow-1" v-if="prayer">
              <strong>생성된 기도문</strong>
              <p class="prayer-text">{{ prayer }}</p>
              <p>필요하다면 기도문을 수정하세요</p>
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
        console.log(this.input);
        
        let prayerObject = await axios.get(`http://localhost:8080/ai/generate`,
          {
            params: {
              message: this.input
            }
          }
        );
        console.log('prayerObject: ', prayerObject)
        this.prayer = prayerObject.data
        console.log('기도문: ',this.prayer)

      }
      catch(error){
        console.error('Error assistants prayers:', error);
      }
      
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