<template>   
  <div class="col-12 col-lg-8">
      <div class="card mt-4 ">
        <div class="card-header">
          <span class="font-weight-bold h3">
            {{ favorRests.length }}
          </span>
          間收藏的餐廳
          <a href="/more">More</a>
        </div>
        <div class="card-body d-flex flex-wrap justify-content-start" style="min-height: 115px;">
          <router-link 
          v-for="favorRest in favorRests"
          :key="favorRest.id"
          :to="{ name: 'restaurant', params: { id: favorRest.id }}" 
          class="m-2">
            <img 
              :src="favorRest.image"
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
    favorRests: {
      type: Array,
      required: true
    }
  }
}
</script>