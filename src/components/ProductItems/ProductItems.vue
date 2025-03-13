<template>
  <div class="product-items">
    <div v-for="product in products" :key="product.id" class="product-items-card">
      <img :src="product.thumbnail" alt="">
      <p class="product-items-card-title">{{ product.title }}</p>
      <p>{{ product.description }}</p>
      <div class="product-items-card-degree">
        <vue-star-rating
            :increment="0.01"
            :rating="product.rating"
            :read-only="true"
            :show-rating="false"
            :star-size="20"/>
        <p class="product-items-card-degree-price">{{ product.price }} ₺</p>
      </div>

    </div>
  </div>
</template>
<script>
import VueStarRating from 'vue-star-rating'

export default {
  name: "ProductItems",
  components: {

    VueStarRating,

  },
  props: {
    products: {
      type: Array,
      required: true,
    },

  },
}
</script>

<style lang="scss" scoped src="./ProductItems.scss"></style>
