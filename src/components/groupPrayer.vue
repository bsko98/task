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
            class="text-center shadow-lg prayer-card"
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
            <b-card-text  class="mb-4 mt-4" style="font-size: 1.1rem; min-height: 5vh;">
              {{ prayer.userNickname }}
            </b-card-text>
          </b-card-body> 
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
      };
    },
    created(){
      this.getGroups();
    },
    methods: {
      async getGroupPrayers() {
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