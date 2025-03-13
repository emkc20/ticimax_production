<template>
  <div class="product-pagination">
    <pagination v-model="page"
                :per-page="10"
                :records="totalItems"
                :total-pages="totalPages"
                class="custom-pagination"
                @paginate="changePage"/>
  </div>
</template>

<script>
import Pagination from "vue-pagination-2";


export default {
  name: "ProductPagination",
  components: {
    Pagination,
  },
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      page: parseInt(this.$route.query.page) || 1,
    }
  },
  watch: {
    '$route.query.page': function (newPage) {
      this.page = Number(newPage) || 1;
    }
  },
  methods: {
    changePage(page) {
      this.$emit('handlePage', page);
    },
  }
}
</script>

<style lang="scss" scoped src="./ProductPagination.scss"></style>
