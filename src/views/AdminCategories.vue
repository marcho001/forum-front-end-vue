<template>
  <div class="container py-5">
     <!-- 1. 使用先前寫好的 AdminNav -->
    <AdminNav />

    <form class="my-4">
      <div class="form-row">
        <div class="col-auto">
          <input
            v-model="newCategoryName"
            type="text"
            class="form-control"
            placeholder="新增餐廳類別..."
          >
        </div>
        <div class="col-auto">
          <button
            type="button"
            class="btn btn-primary"
            :disabled="isProcessing"
            @click.stop.prevent="createCategory(newCategoryName)"
          >
            新增
          </button>
        </div>
      </div>
    </form>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th
            scope="col"
            width="60"
          >
            #
          </th>
          <th scope="col">
            Category Name
          </th>
          <th
            scope="col"
            width="210"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="category in categories"
          :key="category.id"
        >
          <th scope="row">
            {{ category.id }}
          </th>
          <td class="position-relative">
            <div 
              v-show="!category.isEditing"
              class="category-name">
              {{ category.name }}
            </div>
            <input
              v-show="category.isEditing"
              v-model="category.name"
              type="text"
              class="form-control"
            >
            <span
              @click="handleCancel(category.id)"
              v-show="category.isEditing"
              class="cancel"
            >
              ✕
            </span>
          </td>
          <td class="d-flex justify-content-between">
            <button
              v-show="!category.isEditing"
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="toggleIsEditing(category.id)"
            >
              Edit
            </button>
            <button
              @click.stop.prevent="updateCategory({ categoryId: category.id, name: category.name })"
              v-show="category.isEditing"
              type="button"
              class="btn btn-link mr-2"
            >
              Save
            </button>
            <button
              @click.stop.prevent="deleteCategory(category.id)"
              type="button"
              class="btn btn-link mr-2"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from '@/components/AdminNav'
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'
//  2. 定義暫時使用的資料

export default {
  components: {
    AdminNav
  },
  // 3. 定義 Vue 中使用的 data 資料
  data () {
    return {
      newCategoryName: '',
      categories: [],
      isProcessing: false
    }
  },
  // 5. 調用 `fetchCategories` 方法
  created () {
    this.fetchCategories()
  },
  methods: {
    // 4. 定義 `fetchCategories` 方法，把 `dummyData` 帶入 Vue 物件
    async fetchCategories () {
      try {
        const { data } = await adminAPI.categories.get()
        this.categories = 
          data.categories.map(category =>({
            ...category,
            isEditing: false,
            nameCached: ''
          }))
      } catch (err) {
        console.log(err)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳類別，請稍後再試'
        })
      }
    },
    async createCategory(name) {
      try {
        this.isProcessing = true
        const { data } = await adminAPI.categories.post({ name })
        if (data.status !== 'success') throw new Error(data.message)
        this.categories.push({
          id: data.categoryId,
          isEditing: false,
          name,
          nameCached: ""
        })
        this.newCategoryName = ''
        this.isProcessing = false
      } catch (err) {
        this.isProcessing = false
        console.log(err)
        Toast.fire({
          icon: 'error',
          title: '無法新增類別，請稍後再試'
        })
      }
    },
    async deleteCategory(id){
      try {
        const { data } = await adminAPI.categories.delete(id)
        if (data.status !== 'success') throw new Error(data.message)
        this.categories = this.categories.filter(category => category.id !== id)
      } catch (err) {
        console.log(err)
        Toast.fire({
          icon: 'error',
          title: '無法刪除類別，請稍後再試'
        })
      }
      this.categories = this.categories.filter(category => category.id !== id)
    },
    toggleIsEditing(id){
      this.categories = this.categories.map(category => {
        if (category.id === id) {
          return {
            ...category,
            isEditing: !category.isEditing,
            nameCached: category.name
          }
        }
        return category
      })
    },
    async updateCategory({ categoryId, name }){
      try {
        const { data } = await adminAPI.categories.update(categoryId, { name })
        console.log(data)
        if (data.status !== 'success') throw new Error(data.message)
        this.toggleIsEditing(categoryId)
      } catch (err) {
        console.log(err)
        Toast.fire({
          icon: 'error',
          title: '無法更新餐廳，請稍後再試'
        })
      }
    },
    handleCancel(id) {
      this.categories = this.categories.map(category => {
        if (category.id === id){
          return {
            ...category,
            name: category.nameCached
          }
        }
        return category
      })
      this.toggleIsEditing(id)
    }
  },
  
}
</script>

<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>