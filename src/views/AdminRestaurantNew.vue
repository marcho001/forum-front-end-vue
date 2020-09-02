<template>
 <div class="container py-5">
    <AdminRestaurantForm 
      @after-submit="handleAfterSubmit"
      :is-processing="isProcessing"/>
  </div>
</template>

<script>
import AdminRestaurantForm from '../components/AdminRestaurantForm'
import { Toast } from '../utils/helpers'
import adminAPI from '../apis/admin'
export default {
  components: {
    AdminRestaurantForm
  },
  data () {
    return {
      isProcessing: false
    }
  },
  methods: {
    async handleAfterSubmit(formData){
      try {
        this.isProcessing = true
        const { data } = await adminAPI.restaurants.create({ formData })
        if (data.status !== 'success') throw new Error(data.message)

        this.$router.push({ name: 'admin-restaurants'})
      } catch (err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法新增餐聽，請稍後再試'
        })
      }
      for(let [name, value] of formData.entries()) {
        console.log(name + ': ' + value)
      }
    }
  }
}
</script>