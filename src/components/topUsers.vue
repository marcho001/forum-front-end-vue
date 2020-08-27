<template>
      <div class="col-3 mx-2">
        <a href="#">
          <img
            :src="topUser.image"
            width="140px"
            height="140px"
          >
        </a>
        <h2>{{topUser.name}}</h2>
        <span class="badge badge-secondary">追蹤人數：{{topUser.FollowerCount}}</span>
        <p class="mt-3">
          <button
            v-if="topUser.isFollowed"
            @click="removeFollowed"
            type="button"
            class="btn btn-danger"
          >
            取消追蹤
          </button>
          <button
            v-else
            @click="addFollowed"
            type="button"
            class="btn btn-primary"
          >
            追蹤
          </button>
        </p>
      </div>
</template>

<script>
export default {
  props: {
    initUsers: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      topUser: this.initUsers
    }
  },
  methods: {
    addFollowed(){
      this.topUser = {
        ...this.topUser,
        isFollowed: true
      }
    },
    removeFollowed(){
      this.topUser = {
        ...this.topUser,
        isFollowed: false
      }
    }
  }
}
</script>