<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">
      最新動態
    </h1>
    <hr>
    <div class="row">
      <div class="col-md-6">
        <h3>最新餐廳</h3>
        <NewestRestaurants :restaurants="restaurants"/>
      </div>
      <div class="col-md-6">
        <h3>最新評論</h3>
        <NewestComments :comments="comments"/>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from '../components/NavTab'
import NewestRestaurants from '../components/NewestRestaurants'
import NewestComments from '../components/NewestComments'
import RestaurantsAPI from '../apis/restaurants'
import { Toast } from '../utils/helpers'


export default {
  name: 'RestaurantFeeds',
  components:{
    NavTabs,
    NewestRestaurants,
    NewestComments
  },
  data(){
    return {
      restaurants: [],
      comments: []
    }
  },
  methods: {
    async fetchFeeds (){
      try {
        const res = await RestaurantsAPI.getRestaurantsFeeds()
        const { restaurants, comments } = res.data

        if (res.statusText !== 'OK') throw new Error()

        this.restaurants = restaurants
        this.comments = comments

      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '網頁出現錯誤，請稍後再試'
        })
      }
    //   this.restaurants = restaurants
    //   this.comments = comments.filter(comment => comment.Restaurant && comment.text)
    }
  },
  created(){
    this.fetchFeeds()
  }
}
</script>