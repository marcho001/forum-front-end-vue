<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">
      人氣餐廳
    </h1>

    <hr>
    <RestaurantsTopCard 
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      :init-restaurant="restaurant"/>
  </div>
</template>

<script>
import NavTabs from '../components/NavTab'
import RestaurantsTopCard from '../components/RestaurantTopCard'
import restaurantsAPI from '../apis/restaurants'
import { Toast } from '../utils/helpers'

export default {
  components:{
    NavTabs,
    RestaurantsTopCard
  },
  data(){
    return {
      restaurants: []
    }
  },
  methods: {
    async fetchRestaurantsTop () {
      try {
        const { data } = await restaurantsAPI.getRestaurantsTop()
        this.restaurants = data.restaurants.map(rest => ({
          id: rest.id,
          name: rest.name,
          isFavorited: rest.isFavorited,
          image: rest.image,
          description: rest.description,
          FavoriteCount: rest.FavoriteCount
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
  created () {
    this.fetchRestaurantsTop()
  }
}
</script>