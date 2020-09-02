import { apiHelper } from '../utils/helpers'

export default {
  signIn ({ email, password }) {
    return apiHelper.post('/signin', {
      email,
      password
    })
  },
  signup (formData) {
    console.log(formData)
    return apiHelper.post('/signup', formData)
  }
}
