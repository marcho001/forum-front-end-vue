<template>
  <div class="container py-5">
    <NavTabs />
    <div class="row">
      <RestaurantNavPills :categories="categories" />
      <RestaurantCard 
        v-for="restaurant in restaurants" 
        :key="restaurant.id"
        :initial-restaurant="restaurant"/>
    </div>   
    <RestaurantPagination
      v-if="totalPage"
      :category-id="categoryId"
      :current-page="currentPage"
      :total-page="totalPage"/>
  </div>
</template>

<script>
import NavTabs from '../components/NavTab'
import RestaurantCard from '../components/RestaurantCard'
import RestaurantNavPills from '../components/RestaurantsNavPill'
import RestaurantPagination from '../components/RestaurantsPagination'
import restaurantsAPI from '../apis/restaurants'
import { Toast } from '../utils/helpers'

export default {
  components:{
    NavTabs,
    RestaurantCard,
    RestaurantNavPills,
    RestaurantPagination
  },
  data(){
    return {
      categories: [],
      categoryId: "",
      currentPage: 1,
      restaurants: [],
      totalPage: []
    }
  },
  methods: {
    async fetchRestaurants({ queryPage, queryCategoryId }){
      try {
        
        const res = await restaurantsAPI.getRestaurants({ 
          page: queryPage, 
          categoryId: queryCategoryId})
        const { 
          categories, 
          categoryId, 
          page, 
          restaurants,
          totalPage,
          prev,
          next } = res.data

        if (res.statusText !== "OK") throw new Error()

        this.categories = categories
        this.categoryId = categoryId
        this.currentPage = page
        this.restaurants = restaurants
        this.totalPage = totalPage
        this.previousPage = prev
        this.nextPage = next

      } catch (err) {

        console.log(err)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }

    }
  },
  created(){
    const { page = '', categoryId = '' } = this.$route.query
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId
    })
  },
  beforeRouteUpdate (to, from, next) {
    const { page = '', categoryId = '' } = to.query
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId })
    
    next()
  }
}
</script>