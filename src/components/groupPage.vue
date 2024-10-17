<template>
  <div class="container mt-5">
    <b-row class="align-items-center">
      <b-col class="text-center">
        <h2 class="mt-5 ">내 그룹 목록</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols=""></b-col>
      <b-col cols="2" class="text-right">
        <div class="d-flex gap-2">
        <button 
          @click="openModal('groupModal')" 
          class="btn btn-primary" type="button"
          variant="primary">
          그룹 생성
        </button>
        <button 
          @click="openModal('userModal')" 
          class="btn btn-primary" type="button"
          variant="primary">
          그룹에 초대
      </button>
        </div>
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

    <div class="modal fade" id="makeGroupModal" tabindex="-1" ref="modal" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">그룹 생성하기</h5>
            <button type="button" class="btn-close" @click="closeModal('groupModal')"></button>
          </div>
          <div class="modal-body mb-3">
            <label for="groupNameInput" class="col-form-label">그룹명:</label>
            <input 
              id="groupNameInput"
              type="text"
              class="form-control" 
              v-model="groupNameInput" 
              placeholder="내용을 입력하세요"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="createGroup">생성</button>
            <button type="button" class="btn btn-secondary" @click="closeModal('groupModal')">닫기</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="inviteUserModal" tabindex="-1" ref="modal" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">그룹에 초대</h5>
            <button type="button" class="btn-close" @click="closeModal('userModal')"></button>
          </div>
          <div class="modal-body">
            <label for="usernameInput" class="col-form-label">초대할 그룹:</label>
            <select v-model="selectedGroup" class="custom-select">
              <option v-for="group in groups" :key="group.id" :value="group.groupName">
                {{ group.groupName }}
              </option>
            </select>
          </div>
          <div class="modal-body mb-3">
            <label for="usernameInput" class="col-form-label">사용자 아이디:</label>
            <input 
              id="usernameInput"
              type="text"
              class="form-control" 
              v-model="usernameInput" 
              placeholder="내용을 입력하세요"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="inviteMember">초대</button>
            <button type="button" class="btn btn-secondary" @click="closeModal('userModal')">닫기</button>
          </div>
        </div>
      </div>
    </div>
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
      ],
      modals: {  
        groupModal: null,
        userModal: null,
      },
      groupNameInput: '',
      usernameInput:'',
    };
  },
  created(){
    this.loadGroups()
  },
  mounted() {
    const bootstrap = require('bootstrap');
    this.modals.groupModal = new bootstrap.Modal(document.getElementById('makeGroupModal'));
    this.modals.userModal = new bootstrap.Modal(document.getElementById('inviteUserModal'));
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
            this.$router.go(0);
          })
          .catch((error) => {
            console.error("Error deleting:", error);
          });
        }

    },
    getNewMember(groupId, memberId) {
      console.log("groupId: ",groupId," memberId: ",memberId)
    },
    openModal(modalName) {
      console.log(this.modals[modalName])
      this.groupNameInput = '';
      this.usernameInput = '';
      this.modals[modalName].show();
    },
    closeModal(modalName) {
      this.modals[modalName].hide();
    },
    createGroup() {
      console.log('그룹명:', this.groupNameInput);
      axios.post("http://localhost:8080/createGroup",{
        groupName : this.groupNameInput
      }).then(() => {
            console.log("그룹이 생성되었습니다.")
            alert('그룹이 생성되었습니다.');
            this.$router.go(0);
          })
      .catch((error) => {
            console.error("Error:", error);
          });
      this.closeModal('groupModal');
    },
    inviteMember(){
      console.log('사용자명:', this.usernameInput);
      console.log('groupid: ', this.selectedGroup)
      axios.post("http://localhost:8080/joinGroup",{
        groupName : this.selectedGroup,
        username : this.usernameInput
      }).then(() => {
            console.log("초대 완료.")
            alert('그룹에 초대했습니다.');
            this.$router.go(0);
          })
      .catch((error) => {
            console.error("Error:", error);
          });
      this.closeModal('userModal');
    }
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
