<template>
  <div class="products-container">
    <h3>Ürün Tablosu</h3>
    <div class="products-container-header">
      <product-pagination :totalItems="totalItems" :totalPages="totalPages" @handlePage="handlePage"/>
      <sort-select/>
    </div>

    <div v-if="loading">
      <loading-spinner/>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <div class="products-container-items" v-if="!loading && products?.length">
      <product-items :products="products"/>
    </div>

    <div v-if="!loading && !products.length" class="no-products">Ürün bulunamadı.</div>
  </div>
</template>

<script>
import product from "@/store/product";
import SortSelect from "@/components/SortSelect/SortSelect.vue";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner.vue";
import ProductPagination from "@/components/ProductPagination/ProductPagination.vue";
import ProductItems from "@/components/ProductItems/ProductItems.vue";


export default {
  name: "productList",
  components: {
    ProductItems,
    ProductPagination,
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
