<template>
 <div class="container my-5">
    <h2 class="text-center mb-4">내 그룹</h2>
    
    <div class="d-flex justify-content-end mb-4">
      <button @click="openModal('groupModal')" class="btn btn-primary me-2 text-center">
        그룹 생성
      </button>
      <button @click="openModal('userModal')" class="btn btn-outline-primary text-center">
        초대하기
      </button>
    </div>

    <div v-if="groups && groups.length" class="card">
      <ul class="list-group list-group-flush">
        <li v-for="(group, index) in groups" :key="group.id" class="list-group-item" @click="loadMembers(group)">
          <div @click="toggleGroup(group, index)" class="d-flex justify-content-between align-items-center cursor-pointer">
            <span class="fw-bold">{{ group.groupName }}</span>
            <div>
              <i :class="activeGroup === index ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
              <button
                class="btn btn-outline-danger btn-sm ms-2"
                @click.stop="deleteGroup(group)"
              >
                X
              </button>
            </div>
          </div>

          <div :id="'group-' + index" class="collapse" :class="{ show: activeGroup === index }">
            <div class="card mt-3">
              <div class="card-body">
                <ul class="list-group list-group-flush">
                  <li v-for="member in members" :key="member.id" class="list-group-item d-flex justify-content-between align-items-center">
                    {{ member.nickname }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="alert alert-info" role="alert">
      그룹에 참여해보세요!
    </div>

    <!-- Create Group Modal -->
    <div class="modal fade" id="makeGroupModal" tabindex="-1" ref="groupModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">그룹 생성</h5>
            <button type="button" class="btn-close" @click="closeModal('groupModal')"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="groupNameInput" class="form-label">그룹 이름:</label>
              <input 
                id="groupNameInput"
                type="text"
                class="form-control" 
                v-model="groupNameInput" 
                placeholder="그룹명을 입력하세요"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal('groupModal')">닫기</button>
            <button type="button" class="btn btn-primary" @click="createGroup">생성</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Invite User Modal -->
    <div class="modal fade" id="inviteUserModal" tabindex="-1" ref="userModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">그룹에 초대</h5>
            <button type="button" class="btn-close" @click="closeModal('userModal')"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="groupSelect" class="form-label">그룹 선택:</label>
              <select id="groupSelect" v-model="selectedGroup" class="form-select">
                <option v-for="group in groups" :key="group.id" :value="group.groupName">
                  {{ group.groupName }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="usernameInput" class="form-label">사용자 ID:</label>
              <input 
                id="usernameInput"
                type="text"
                class="form-control" 
                v-model="usernameInput" 
                placeholder="ID를 입력하세요"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal('userModal')">취소</button>
            <button type="button" class="btn btn-primary" @click="inviteMember">초대</button>
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
        },
        {id:2,
          groupName:"testGroupName2"
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
      if(this.groupNameInput == null)
      console.log('그룹명:', this.groupNameInput);
      axios.post("http://localhost:8080/createGroup",{
        groupName : this.groupNameInput
      }).then(() => {
            console.log("그룹이 생성되었습니다.")
            alert('그룹이 생성되었습니다.');
            this.$router.go(0);
          })
      .catch((error) => {
            alert(error.response.data);
            console.error("Error:", error);
          });
      this.closeModal('groupModal');
    },
    inviteMember(){
      axios.post("http://localhost:8080/joinGroup",{
        groupName : this.selectedGroup,
        username : this.usernameInput
      }).then(() => {
            console.log("초대 완료.")
            alert('그룹에 초대했습니다.');
            this.$router.go(0);
          })
      .catch((error) => {
            alert(error.response.data);
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
select{
  width : 100% !important;
}

</style>
