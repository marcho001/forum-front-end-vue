<template>
  <div class="container py-5">
    <form
      @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="currentUser.name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          required
        />
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img 
          v-if="currentUser.image"
          :src="currentUser.image" 
          class="d-block img-thumbnail mb-3"
          width="200" 
          height="200" />
        <input 
          id="image"
          @change="handleChange" 
          type="file" 
          name="image" 
          accept="image/*" class="form-control-file" />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
const dummyUser = {
  currentUser: {
    id: 1,
    name: "管理者",
    email: "root@example.com",
    image: "https://i.pravatar.cc/300",
    isAdmin: true
  },
  isAuthenticated: true
};
export default {
  data() {
    return {
      currentUser: {
        id: -1,
        name: "",
        email: "",
        image: "",
        isAdmin: false
      }
    };
  },
  methods: {
    fetchUser(id) {
      console.log(id)
      const { currentUser } = dummyUser;
      this.currentUser = currentUser
    },
    handleChange(e){
      const { files } = e.target
      if (files.length === 0) {
        this.currentUser.image = ''
        return
      } else {
        const imageURL = 
          window.URL.createObjectURL(files[0])
        this.currentUser.image = imageURL
      }
    },
    handleSubmit(e){
      const form = e.target
      const formData = new FormData(form)
      for(let [name, value] of formData){
        console.log(name +': ' +value)
      }
    }
  },
  created() {
    this.fetchUser();
  }
};
</script>
