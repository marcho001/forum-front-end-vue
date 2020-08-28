<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }} </h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.Category.name }}
      </span>
    </div>

    <hr>

    <ul>
      <li>評論數： {{ restaurant.Comments.length }}</li>
      <li>瀏覽次數： {{ restaurant.viewCounts }}</li>
    </ul>

    <button
      type="button"
      class="btn btn-link"
      @click="$router.back()"
    >
      回上一頁
    </button>
  </div>
</template>

<script>
const dummyData = {
   "restaurant": {
        "id": 6,
        "name": "Vicenta Gutkowski Test By Nacho",
        "tel": "128-905-3953",
        "address": "371 Reuben Vista test",
        "opening_hours": "00:00",
        "description": "labore",
        "image": "https://loremflickr.com/320/240/restaurant,food/?random=16.659471621888123",
        "viewCounts": 202,
        "createdAt": "2020-02-28T14:38:32.000Z",
        "updatedAt": "2020-08-28T06:18:21.000Z",
        "CategoryId": 2,
        "Category": {
            "id": 2,
            "name": "日本料理",
            "createdAt": "2020-02-28T14:38:32.000Z",
            "updatedAt": "2020-02-28T14:38:32.000Z"
        },
        "Comments": [
            {
                "id": 6,
                "text": "Excepturi perspiciatis cupiditate quae.",
                "UserId": 1,
                "RestaurantId": 6,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "User": {
                    "id": 1,
                    "name": "root",
                    "email": "root@example.com",
                    "password": "$2a$10$J9pLpJJ1Tzfe/ZcjdYwXdumyh.3F5E.w/HTxRcH./cl3azhgekgQe",
                    "isAdmin": true,
                    "image": "https://i.imgur.com/kTEFFYJ.png",
                    "createdAt": "2020-02-28T14:38:32.000Z",
                    "updatedAt": "2020-07-13T11:32:31.000Z"
                }
            },
            {
                "id": 56,
                "text": "Aspernatur iusto accusantium tempore.",
                "UserId": 3,
                "RestaurantId": 6,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "User": {
                    "id": 3,
                    "name": "BB Bear",
                    "email": "user2@example.com",
                    "password": "$2a$10$VHKmtPqbcUzK46qxLllqj.w506U2N2TObMmnpdlNG2CLZPa1xzuTi",
                    "isAdmin": false,
                    "image": "https://i.imgur.com/IaCnj2S.jpg",
                    "createdAt": "2020-02-28T14:38:32.000Z",
                    "updatedAt": "2020-08-11T13:08:12.000Z"
                }
            },
            {
                "id": 106,
                "text": "Eveniet minima et facilis dolores consectetur ipsum eveniet corporis.",
                "UserId": 1,
                "RestaurantId": 6,
                "createdAt": "2020-02-28T14:38:32.000Z",
                "updatedAt": "2020-02-28T14:38:32.000Z",
                "User": {
                    "id": 1,
                    "name": "root",
                    "email": "root@example.com",
                    "password": "$2a$10$J9pLpJJ1Tzfe/ZcjdYwXdumyh.3F5E.w/HTxRcH./cl3azhgekgQe",
                    "isAdmin": true,
                    "image": "https://i.imgur.com/kTEFFYJ.png",
                    "createdAt": "2020-02-28T14:38:32.000Z",
                    "updatedAt": "2020-07-13T11:32:31.000Z"
                }
            },
            {
                "id": 4452,
                "text": "good",
                "UserId": 1,
                "RestaurantId": 6,
                "createdAt": "2020-04-14T08:12:36.000Z",
                "updatedAt": "2020-04-14T08:12:36.000Z",
                "User": {
                    "id": 1,
                    "name": "root",
                    "email": "root@example.com",
                    "password": "$2a$10$J9pLpJJ1Tzfe/ZcjdYwXdumyh.3F5E.w/HTxRcH./cl3azhgekgQe",
                    "isAdmin": true,
                    "image": "https://i.imgur.com/kTEFFYJ.png",
                    "createdAt": "2020-02-28T14:38:32.000Z",
                    "updatedAt": "2020-07-13T11:32:31.000Z"
                }
            },
            {
                "id": 4462,
                "text": "good",
                "UserId": 112,
                "RestaurantId": 6,
                "createdAt": "2020-04-14T08:22:05.000Z",
                "updatedAt": "2020-04-14T08:22:05.000Z",
                "User": {
                    "id": 112,
                    "name": "測試",
                    "email": "123@example.com",
                    "password": "$2a$10$oJlwrpCT8jAC2Kamet775u3kNbd.SV85yvHH9c/L2bKODZ437Cn/K",
                    "isAdmin": false,
                    "image": null,
                    "createdAt": "2020-03-12T15:28:49.000Z",
                    "updatedAt": "2020-03-12T15:28:49.000Z"
                }
            },
            {
                "id": 4982,
                "text": "123",
                "UserId": 1,
                "RestaurantId": 6,
                "createdAt": "2020-07-17T15:53:27.000Z",
                "updatedAt": "2020-07-17T15:53:27.000Z",
                "User": {
                    "id": 1,
                    "name": "root",
                    "email": "root@example.com",
                    "password": "$2a$10$J9pLpJJ1Tzfe/ZcjdYwXdumyh.3F5E.w/HTxRcH./cl3azhgekgQe",
                    "isAdmin": true,
                    "image": "https://i.imgur.com/kTEFFYJ.png",
                    "createdAt": "2020-02-28T14:38:32.000Z",
                    "updatedAt": "2020-07-13T11:32:31.000Z"
                }
            }
        ]
    }
}
export default {
  data(){
    return {
      restaurant: dummyData.restaurant
    }
  }
}
</script>