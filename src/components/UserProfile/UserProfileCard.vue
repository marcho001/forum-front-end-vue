<template> 
  <div class="row bg-white rounded mt-4">
    <div class="d-flex justify-content-center align-items-center col-6 col-lg-4 overflow-hidden m-1">
      <img 
      :src="profile.image" 
      alt="User-photo" height="270px" width="270px" class="rounded-circle">
    </div>
    <div class="col-5 col-lg-7 mt-3">
      <h3> {{ profile.name }} </h3>
      <p> {{ profile.email }} </p>
      <div>
        <span class="font-weight-bold h4">
          {{ profile.Comments }}
        </span>
        間已評論餐廳
      </div>
      <div>
        <span class="font-weight-bold h4">
          {{ profile.FavoritedRestaurants }}
        </span>
        間收藏的餐廳
      </div>
      <div>
        <span class="font-weight-bold h4">
          {{ profile.Followers }}
        </span>
        follower (追隨者)
      </div>
      <div>
        <span class="font-weight-bold h3">
          {{ profile.Followings }}
        </span>
        following (追蹤者)
      </div>

      <a
        v-if="profile.id === currentUser.id" 
        href="/users/31/edit" class="btn btn-primary mt-1">EDIT
      </a>
      <p 
       v-else
       class="mt-3">
          <button
            v-if="isFollowed"
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
  </div>
</template>

<script>
const dummyUser = {
  currentUser: {
    id: 2,
    name: '管理者',
    email: 'root@example.com',
    image: 'https://i.pravatar.cc/300',
    isAdmin: true
  },
  isAuthenticated: true
}
export default {
  props: {
    profile: {
      type: Object,
      required: true
    },
    initIsFollowed: {
      type: Boolean
    }
  },
  data(){
    return {
      isFollowed: this.initIsFollowed,
      currentUser: dummyUser.currentUser
    }
  },
  methods: {
    addFollowed(){
      this.isFollowed = true
    },
    removeFollowed(){
      this.isFollowed = false
    }
  }
}
</script>