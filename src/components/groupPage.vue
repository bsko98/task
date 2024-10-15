<template>
  <div class="container mt-5">
    <ul class="list-group">
      <li
        v-for="(group, index) in groups"
        :key="group.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <!-- 그룹 이름과 토글 아이콘 -->
        <div @click="toggleGroup(index)" class="w-100 d-flex justify-content-between align-items-center">
          <span>{{ group.name }}</span>
          <div>
            <i :class="activeGroup === index ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
            <!-- X 버튼 (삭제) -->
            <button
              class="btn btn-danger btn-sm ms-2"
              @click.stop="deleteGroup(index)"
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
                <li v-for="member in group.members" :key="member.id" class="list-group-item">
                  {{ member.name }}
                  <button
                    class="btn btn-danger btn-sm"
                    @click.stop="removeMember(index, member.id)"
                  >
                    ✕
                  </button>
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
export default {
  data() {
    return {
      activeGroup: null, // 현재 열린 그룹의 인덱스
      groups: [
        {
          id: 1,
          name: 'Group A',
          members: [
            { id: 1, name: '범수' },
            { id: 2, name: '정환' },
          ],
        },
        {
          id: 2,
          name: 'Group B',
          members: [
            { id: 1, name: 'Charlie' },
            { id: 2, name: 'David' },
          ],
        },
      ],
    };
  },
  methods: {
    toggleGroup(index) {
      this.activeGroup = this.activeGroup === index ? null : index; // 그룹 열고 닫기
    },
    deleteGroup(index) {
      if(confirm("정말 삭제하시겠습니까?")){
        this.groups.splice(index, 1); // 그룹 삭제
        if (this.activeGroup === index) {
          this.activeGroup = null; // 삭제된 그룹이 열린 상태라면 닫기
        }
      }
    },
    removeMember(groupIndex, memberIndex) {
      console.log(groupIndex,memberIndex)
      this.groups[groupIndex].members.splice(memberIndex-1, 1); // 그룹에서 멤버 삭제
    },
  },
};
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}
button {
  border: none;
  background: transparent;
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
