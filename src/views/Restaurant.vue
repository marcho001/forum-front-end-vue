<template>
  <div class="container py-5">
    <RestaurantDetail :init-restaurant="restaurant"/>
    <hr>
    <RestaurantComments 
      :comments="restaurantComments"
      @after-delete-comment="afterDeleteComment"/>
    <CreateComment 
      :restaurantId="restaurant.id"
      @after-create-comment="afterCreateComment"/>
  </div>
</template>

<script>
import RestaurantDetail from '../components/RestaurantDetail'
import RestaurantComments from '../components/RestaurantComments'
import CreateComment from '../components/comment/CreateComment'
const dummyData = {
  "restaurant": {
        "id": 1,
        "name": "Judy Runte",
        "tel": "(918) 827-1962",
        "address": "98138 Elisa Road",
        "opening_hours": "08:00",
        "description": "dicta et cupiditate",
        "image": "https://loremflickr.com/320/240/food,dessert,restaurant/?random=1",
        "createdAt": "2019-06-22T09:00:43.000Z",
        "updatedAt": "2019-06-22T09:00:43.000Z",
        "CategoryId": 3,
        "Category": {
            "id": 3,
            "name": "義大利料理",
            "createdAt": "2019-06-22T09:00:43.000Z",
            "updatedAt": "2019-06-22T09:00:43.000Z"
        },
        "FavoritedUsers": [],
        "LikedUsers": [],
        "Comments": [
            {
                "id": 3,
                "text": "Quos asperiores in nostrum cupiditate excepturi aspernatur.",
                "UserId": 2,
                "RestaurantId": 1,
                "createdAt": "2019-06-22T09:00:43.000Z",
                "updatedAt": "2019-06-22T09:00:43.000Z",
                "User": {
                    "id": 2,
                    "name": "user1",
                    "email": "user1@example.com",
                    "password": "$2a$10$0ISHJI48xu/VRNVmEeycFe8v5ChyT305f8KaJVIhumu7M/eKAikkm",
                    "image": "https://i.imgur.com/XooCt5K.png",
                    "isAdmin": false,
                    "createdAt": "2019-06-22T09:00:43.000Z",
                    "updatedAt": "2019-06-23T01:16:31.000Z"
                }
            }
        ]
    },
  "isFavorited": false,
  "isLiked": false
}
const dummyUser = {
  currentUser: {
    id: 1,
    name: '管理者',
    email: 'root@example.com',
    image: 'https://i.pravatar.cc/300',
    isAdmin: true
  },
  isAuthenticated: true
}
export default {
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment
  },
  data(){
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description: '',
        isFavorited: false,
        isLiked: false
      },
      currentUser: dummyUser.currentUser,
      restaurantComments: []
    }
  },
  methods: {
    fetchRestaurant (restaurantId) {
      const { restaurant, isFavorited, isLiked } = dummyData
      console.log('fetchRestaurant id: ', restaurantId)
      this.restaurant = {
        id: restaurant.id,
        name: restaurant.name,
        categoryName: restaurant.Category.name,
        image: restaurant.image,
        openingHours: restaurant.opening_hours,
        tel: restaurant.tel,
        address: restaurant.address,
        description: restaurant.description,
        isFavorited,
        isLiked
      }

      this.restaurantComments = restaurant.Comments
    },
    afterDeleteComment(commentId){
      this.restaurantComments = this.restaurantComments.filter(
        comment => comment.id !== commentId
        )
    },
    afterCreateComment(payload){
      const { commentId, restaurantId, text } = payload
      this.restaurantComments.push({
        id: commentId,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name
        },
        text,
        createdAt: new Date()
      })
    }
  },
  created(){
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  }
}
</script>