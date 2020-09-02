<template>
  <div
      class="card mb-3"
      style="max-width: 540px;margin: auto;"
    >
      <div class="row no-gutters">
        <div class="col-md-4">
          <router-link
            :to="{ name: 'restaurant', params: { id: restaurant.id } }">
            <img
              class="card-img"
              :src="restaurant.image"
            >
          </router-link>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              {{ restaurant.name }}
            </h5>
            <span class="badge badge-secondary">收藏數：{{ restaurant.FavoriteCount}}</span>
            <p class="card-text">
              {{ restaurant.description }}
            </p>
            <router-link
              :to="{ name: 'restaurant', params: { id: restaurant.id }}"
              class="btn btn-primary mr-2"
            >Show</router-link>

            <button
              v-if="restaurant.isFavorited"
              @click.stop.prevent="removeFavorite(restaurant.id)"
              type="button"
              class="btn btn-danger mr-2"
            >
              移除最愛
            </button>
            <button
              v-else
              @click.stop.prevent="addFavorite(restaurant.id)"
              type="button"
              class="btn btn-primary"
            >
              加到最愛
            </button>
          </div>
        </div>
      </div>
    </div>  
</template>

<script>
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'
export default {
  props: {
    initRestaurant: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      restaurant: this.initRestaurant
    }
  },
  methods: {
    async addFavorite(restaurantId){
      try {
        const { data } = await usersAPI.addFavorite({ restaurantId })
        if (data.status !== "success") throw new Error()
        this.restaurant = {
          ...this.restaurant,
          isFavorited: true
        }
      } catch (err) {
        console.log(err)
        Toast.fire({
          icon: 'error',
          title: '網路異常，請稍後再試'
        })
      }
    },
    async removeFavorite(restaurantId){
      try {
        const { data } = await usersAPI.removeFavorite({ restaurantId })
        if (data.status !== 'success') throw new Error()
        this.restaurant = {
          ...this.restaurant,
          isFavorited: false
        }
      } catch (err) {
        console.log(err)
        Toast.fire({
          icon: 'error',
          title: '網路異常，請稍後再試'
        })
      }
    }
  }
}
</script>