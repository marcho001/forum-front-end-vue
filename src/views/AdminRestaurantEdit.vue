<template>
  <div class="container py-5">
    <AdminRestaurantForm 
    :is-processing="isProcessing"
    :init-restaurant="restaurant"
    @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import AdminRestaurantForm from './../components/AdminRestaurantForm.vue'
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'

export default {
  components: {
    AdminRestaurantForm
  },
  data(){
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryId: '',
        tel: '',
        address: '',
        description: '',
        image: '',
        openingHours: ''
      },
      isProcessing: false
    }
  },
  methods: {
    async fetchRestaurant (restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.getDetail({ restaurantId })
        const {
          id,
          name,
          tel,
          address,
          opening_hours: openingHours,
          description,
          image,
          CategoryId: categoryId
        } = data.restaurant

        // STEP 4: 將資料帶入 Vue 內
        this.restaurant = {
          ...this.restaurant,
          id,
          name,
          tel,
          address,
          openingHours,
          description,
          image,
          categoryId
        }
      } catch (err) {
        console.log(err)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳表單，請稍後再試'
        })
      }
    },
    async handleAfterSubmit (formData) {
      try {
        this.isProcessing = true
        const { data } = await adminAPI.restaurants.update({
          restaurantId: this.restaurant.id,
          formData })
        console.log(data)
        if (data.status !== 'success') throw new Error(data.message)
        this.$router.push({ name: 'admin-restaurants' })
      } catch (err) {
        this.isProcessing = false
        console.log(err)
        Toast.fire({
          icon: 'error',
          title: '無法更新資料，請稍後再試'
        })
      }
    }
  },
  created(){
    const { id } = this.$route.params
    this.fetchRestaurant(id)
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  }
}
</script>