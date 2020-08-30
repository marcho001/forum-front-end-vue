<template> 
<div class="col-12 col-lg-4">
      <div class="card mt-4">
        <div class="card-header">
          <span class="font-weight-bold h3">
            {{ followers.length }}
          </span>
          follower (追蹤者)
          <a href="/more">More</a>
        </div>
        <div class="card-body d-flex flex-wrap justify-content-start" style="min-height: 115px;">
          <router-link 
            v-for="follower in followers" 
            :key="follower.id"
            :to="{ name: 'users-profile', params: { id: follower.id }}" 
            class="m-2">
            <img 
              :src="follower.image" class="rounded shadow" style="width: 75px; height: 75px;">
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    followers: {
      type: Array,
      required: true
    }
  }
}
</script>