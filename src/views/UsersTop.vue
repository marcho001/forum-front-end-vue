<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">
      美食達人
    </h1>
    <hr>
    <div class="row text-center">
    <topUsers 
      v-for="user in users" 
      :key="user.id"
      :init-users="user" />
  </div>
  </div>
</template>

<script>
import NavTabs from '../components/NavTab'
import topUsers from '../components/topUsers'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

export default {
  components:{
    topUsers,
    NavTabs
  },
  data(){
    return {
      users: []
    }
  },
  methods: {
    async fetchUsers(){
      try {
        let { data } = await usersAPI.getUsersTop()
        
        this.users = data.users.map(user => ({
          id: user.id,
          name: user.name,
          image: user.image,
          followerCount: user.FollowerCount,
          isFollowed: user.isFollowed
        }))
      } catch (err) {
        console.log(err)
        Toast.fire({
          icon: 'error',
          title: '網路異常，請稍後再試'
        })
      }
    }
  },
  created(){
    this.fetchUsers()
  }
}
</script>