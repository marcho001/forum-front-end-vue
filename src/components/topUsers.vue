<template>
      <div class="col-3 mx-2">
        <a href="#">
          <img
            :src="topUser.image | emptyImage"
            width="140px"
            height="140px"
          >
        </a>
        <h2>{{topUser.name}}</h2>
        <span class="badge badge-secondary">追蹤人數：{{topUser.followerCount}}</span>
        <p class="mt-3">
          <button
            v-if="topUser.isFollowed"
            @click="removeFollowed(topUser.id)"
            type="button"
            class="btn btn-danger"
          >
            取消追蹤
          </button>
          <button
            v-else
            @click="addFollowed(topUser.id)"
            type="button"
            class="btn btn-primary"
          >
            追蹤
          </button>
        </p>
      </div>
</template>

<script>
import { emptyImageFilter } from '../utils/mixins'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'
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
    async addFollowed(userId){
      try {
        const { data } = await usersAPI.addFollow(userId)
        if (data.status !== 'success') throw new Error()
        this.topUser = {
          ...this.topUser,
          isFollowed: true
        }
      } catch (err) {
        console.log(err)
        Toast.fire({
          icon: 'error',
          title: "網路異常，請稍後再試"
        })
      }
    },
    async removeFollowed(userId){
      try {
        const { data } = await usersAPI.removeFollow(userId)
        if (data.status !== 'success') throw new Error()
        this.topUser = {
          ...this.topUser,
          isFollowed: false
        }
      } catch (err) {
        console.log(err)
        Toast.fire({
          icon: 'error',
          title: "網路異常，請稍後再試"
        })
      }
    }
  },
  mixins: [emptyImageFilter]
}
</script>