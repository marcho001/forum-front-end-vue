import { apiHelper } from '../utils/helpers'
const getToken = () => window.localStorage.getItem('token')

export default {
  categories: {
    get () {
      return apiHelper.get('/admin/categories', {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    post (formData) {
      return apiHelper.post('/admin/categories', formData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    delete (id) {
      return apiHelper.delete(`/admin/categories/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    update (id, data) {
      return apiHelper.put(`/admin/categories/${id}`, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
    }
  },
  restaurants: {
    getDetail (restaurantId) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    update ({ restaurantId, formData }) {
      return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    create ({ formData }) {
      return apiHelper.post('/admin/restaurants', formData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    }
  }
}
