<template>
  <div class="container mt-5">
    <b-row class="align-items-center">
      <b-col></b-col>
      <b-col class="text-center">
        <h2 class="mt-5">내 그룹 목록</h2>
      </b-col>
      <b-col class="text-right">
        <b-button 
          @click="moveToSavePage()" 
          squared 
          type="submit" 
          variant="primary">
          그룹 생성하기
        </b-button>
      </b-col>
    </b-row>
    <ul class="list-group mt-5" v-if="this.groups">
      <li
        v-for="(group, index) in groups"
        :key="group.id"
        class="list-group-item d-flex justify-content-between align-items-center"
        @click="loadMembers(group)"
      >
        <!-- 그룹 이름과 토글 아이콘 -->
        <div @click="toggleGroup(group, index)" class="w-100 d-flex justify-content-between align-items-center">
          <span>{{ group.groupName }}</span>
          <div>
            <i :class="activeGroup === index ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
            <!-- X 버튼 (삭제) -->
            <b-button 
              class="btn btn-success btn-sm ms-2 delete-button"
              @click.stop="getNewMember(group)"
              >
              +
            </b-button>
            <button
              class="btn btn-danger btn-sm ms-2 delete-button"
              @click.stop="deleteGroup(group)"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- 그룹 멤버 관리 기능 (펼침/닫힘) -->
        <div :id="'group-' + index" class="collapse" :class="{ show: activeGroup === index }">
          <div class="card mt-3">
            <div class="card-body">
              <ul class="list-group">
                <li v-for="member in members" :key="member.id" class="list-group-item">
                  {{ member.nickname }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      activeGroup: null, // 현재 열린 그룹의 인덱스
      groups: [
        {id:1,
          groupName:"testGroupName"
        }
      ],
      members: [
        { id: 2,
          nickname: "testMemberName"
        }
      ]
    };
  },
  created(){
    this.loadGroups()
  },
  methods: {
    async loadGroups(){
      try{
      const response = await axios.get('http://localhost:8080/myGroup');
      console.log(response.data)
      this.groups = response.data
      }
      catch (error) {
        console.error(error);
      }
    },
    loadMembers(group){
      console.log("그룹: ",group)
      axios.get(`http://localhost:8080/getGroupMembers/${group.id}`)
      .then(response => {
        console.log("그룹 불러오기 결과: ",response.data);
        this.members = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    },
    toggleGroup(group, index) {
      console.log(group)
      this.activeGroup = this.activeGroup === index ? null : index; // 그룹 열고 닫기
    },
    deleteGroup(group) {
      console.log(group)
      if (confirm("그룹을 나가시겠습니까?")) {
        axios
          .delete(`http://localhost:8080/leaveGroup/${group.id}`)
          .then(() => {
            console.log('탈퇴되었습니다.');
            alert('탈퇴되었습니다.');
            this.loadGroups();
          })
          .catch((error) => {
            console.error("Error deleting:", error);
          });
        }

    },
    getNewMember(groupId, memberId) {
      console.log("groupId: ",groupId," memberId: ",memberId)
    },
  },
};
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}
.delete-button {
  border: none;
  color: white;
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
}
li {
  display: inline-block !important;
  margin-right: 10px !important;
}
</style>
