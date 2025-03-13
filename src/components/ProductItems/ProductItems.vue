<template>
  <div class="product-items">
    <div class="product-items-card" v-for="product in products" :key="product.id">
      <img :src="product.thumbnail" alt="">
      <p class="product-items-card-title">{{ product.title }}</p>
      <p>{{ product.description }}</p>
      <div class="product-items-card-degree">
        <vue-star-rating
            :star-size="20"
            :show-rating="false"
            :rating="product.rating"
            :read-only="true"
            :increment="0.01"/>
        <p class="product-items-card-degree-price">{{ product.price }} ₺</p>
      </div>

    </div>
  </div>
</template>
<script setup>
import {defineProps} from "vue";

const {products} = defineProps({
  products: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped lang="scss" src="./ProductItems.scss"></style>
