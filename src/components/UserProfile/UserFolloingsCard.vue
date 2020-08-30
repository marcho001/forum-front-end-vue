<template>
  <div class="col-12 col-lg-4">
      <div class="card mt-4 ">
        <div class="card-header">
          <span class="font-weight-bold h3">
            {{ followings.length }}
          </span>
          following (追蹤者)
          <a href="/more">More</a>
        </div>
        <div class="card-body d-flex flex-wrap justify-content-start" style="min-height: 115px;">
          <router-link 
          v-for="following in followings"
          :key="following.id"
          :to="{ name: 'users-profile', params: { id: following.id} }" 
          class="m-2">
            <img 
              :src="following.image" 
              class="rounded shadow" 
              style="width: 75px; height: 75px;">
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    followings: {
      type: Array,
      required: true
    }
  }
}
</script>