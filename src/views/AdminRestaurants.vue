<template>
  <div class="container py-5">
    <AdminNav />

    <a
      href="#"
      class="btn btn-primary mb-4"
    >
      New Restaurant
    </a>

    <AdminRestaurantsTable />
  </div>
</template>

<script>
import AdminNav from '../components/AdminNav'
import AdminRestaurantsTable from '../components/AdminRest/AdminRestaurantsTable'
export default {
  components: {
    AdminNav,
    AdminRestaurantsTable
  }
}
</script>