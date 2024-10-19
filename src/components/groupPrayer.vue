<template>
      <div class="container mt-5">
    <b-row class="align-items-center">
      <b-col></b-col>
      <b-col class="text-center">
        <h2 class="mt-5" @click="moveToMyPrayer">그룹 기도 목록</h2>
      </b-col>
      <b-col class="text-right">
        <select v-model="selectedGroup" class="form-select" @change="getPrayers">
              <option v-for="group in groups" :key="group.id" :value="group.groupName">
                {{ group.groupName }}
              </option>
        </select>
      </b-col>
    </b-row>
    
    <div v-if="loading" class="text-center mt-4">
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
            :title="prayer.title"
            class="text-center shadow-lg prayer-card"
            style="width: 100%; max-width: 25rem; min-height: 15rem;"
            bg-variant="light"
            border-variant="default"
            header-bg-variant="primary"
            header-text-variant="white"
          >
            <b-card-text  class="mb-4 mt-4" style="font-size: 1.1rem; min-height: 10vh;">
              {{ prayer.content }}
            </b-card-text>
            <b-card-text  class="mb-4 mt-4" style="font-size: 1.1rem; min-height: 5vh;">
              {{ prayer.userNickname }}
            </b-card-text>
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
        groups:[
          
        ],
        prayers: [

        ],
        loading: true, // 로딩 상태
      };
    },
    created(){
      this.getGroups();
    },
    methods: {
      async getPrayers() {
        console.log(this.selectedGroup)
        try {
          const response = await axios.get('http://localhost:8080/getGroupPrayer',{
            params:{groupName: this.selectedGroup}
          });
          this.prayers = response.data;
          console.log(this.prayers)
        } catch (error) {
          console.error('Error fetching prayers:', error);
        }
        finally {
          this.loading = false; // 로딩 완료
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
        finally {
          this.loading = false; // 로딩 완료
        }
      },
      moveToMyPrayer(){
        this.$router.push({path: '/myPrayer'});
      }
    }
}
</script>

<style>
select{
  width: 50% !important;
  margin-left: auto !important;
}
</style>