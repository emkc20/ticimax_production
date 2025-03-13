<template>
  <div class="sort-select">
    <label for="sort">Fiyata Göre Sırala:</label>
    <select v-model="sort" @change="changeSort">
      <option disabled value="Seçiniz">Seçiniz</option>
      <option value="inc">Artan</option>
      <option value="desc">Azalan</option>
    </select>
  </div>
</template>
<script>
import product from "@/store/product";

export default {
  name: "SortSelect",
  data() {
    return {
      sort: this.$route.query.sort || 'Seçiniz',
    }
  },

  computed: {
    product() {
      return product
    },
  },

  methods: {
    changeSort() {
      if (this.sort !== 'Seçiniz') {
        this.$store.commit('product/setSort', this.sort);

        this.$router.push({
          path: this.$route.path,
          query: {...this.$route.query, sort: this.sort},
        });
      }
    },
  },

  watch: {
    '$route.query.sort': function () {
      if (!this.$route.query.sort) {
        this.sort = 'Seçiniz';
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./SortSelect.scss"></style>
