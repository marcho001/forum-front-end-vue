<template>
  <div class="col-12 col-lg-8 o">
      <div class="card mt-4 ">
        <div class="card-header">
          <span class="font-weight-bold h3">
            {{ comments.length }}
          </span>
          間已評論餐廳
          <a href="/more">More</a>
        </div>
        <div class="card-body d-flex flex-wrap justify-content-start" style="min-height: 115px;">
          <router-link
            v-for="comment in comments"
            :key="comment.id"
            :to="{ name: 'restaurant', params: { id: comment.RestaurantId }}" 
            class="m-2">
              <img 
                :src="comment.Restaurant.image" 
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
    comments: {
      type: Array,
      required: true
    }
  }
}
</script>