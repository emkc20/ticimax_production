<template>
  <div class="products-container">
    <h3>Ürün Tablosu</h3>
    <div class="products-container-header">
      <pagination :records="totalItems"
                  v-model="page"
                  :per-page="totalPages"
                  :show-info="false"
                  @paginate="handlePage"
                  :limit="2"
                  class="custom-pagination"/>
      <sort-select/>
    </div>
    <div v-if="loading">
      <loading-spinner/>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <div class="products-container-list" v-if="!loading && products?.length">
      <div class="products-container-list-card" v-for="product in products" :key="product.id">
        <img :src="product.thumbnail" alt="">
        <p class="products-container-list-card-title">{{ product.title }}</p>
        <p>{{ product.description }}</p>
        <div class="products-container-list-card-degree">
          <vue-star-rating
              :star-size="20"
              :show-rating="false"
              :rating="product.rating"
              :read-only="true"
              :increment="0.01"/>
          <p class="products-container-list-card-degree-price">{{ product.price }} ₺</p>
        </div>

      </div>
    </div>

    <div v-if="!loading && !products.length" class="no-products">Ürün bulunamadı.</div>
  </div>
</template>

<script>
import Pagination from 'vue-pagination-2';
import VueStarRating from 'vue-star-rating'
import product from "@/store/product";
import SortSelect from "@/components/SortSelect/SortSelect.vue";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner.vue";


export default {
  name: "productList",
  components: {
    Pagination,
    VueStarRating,
    SortSelect,
    LoadingSpinner
  },
  data() {
    return {
      page: parseInt(this.$route.query.page) || 1,
    }
  },

  computed: {
    product() {
      return product
    },
    products() {
      return this.$store.getters['product/products'];
    },
    loading() {
      return this.$store.getters['product/loading'];
    },
    error() {
      return this.$store.getters['product/error'];
    },
    totalPages() {
      return this.$store.getters['product/totalPages'] || 1;
    },
    totalItems() {
      return this.$store.getters['product/totalItems'] || 10;
    },
  },

  mounted() {
    this.fetchData();
  },

  watch: {
    '$route.query.page': function (newPage) {
      this.page = Number(newPage) || 1;
      this.fetchData();
    }
  },

  methods: {
    handlePage(page) {
      this.navigateTo({page});
      this.fetchData(page);
    },

    async fetchData(page = this.page) {
      await this.$store.dispatch('product/fetchProducts', page)
      if (this.$route.query.sort) {
        this.$store.commit('product/setSort', this.$route.query.sort);
      }
    },

    navigateTo({page}) {
      if (this.$route.query.page !== String(page)) {
        this.$router.push({
          path: this.$route.path,
          query: {...this.$route.query, page}
        });
      }
    }
  }
};
</script>

<style scoped lang="scss" src="./ProductsList.scss"></style>
