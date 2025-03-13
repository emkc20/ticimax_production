<template>
  <div class="products-container">
    <h3>Ürün Tablosu</h3>
    <div class="products-container-header">
      <product-pagination :totalItems="totalItemsCount" :totalPages="totalPagesCount" @handlePage="handlePage"/>
      <sort-select/>
    </div>

    <div v-if="isLoading">
      <loading-spinner/>
    </div>

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

    <div class="products-container-items" v-if="!isLoading && productsList?.length">
      <product-items :products="productsList"/>
    </div>

    <div v-if="!isLoading && !productsList.length" class="no-products">Ürün bulunamadı.</div>
  </div>
</template>

<script setup>
import SortSelect from "@/components/SortSelect/SortSelect.vue";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner.vue";
import ProductItems from "@/components/ProductItems/ProductItems.vue";
import ProductPagination from "@/components/ProductPagination/ProductPagination.vue";
import {useProductStore} from '@/stores/product';

import {ref, computed, onMounted, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();
const productStore = useProductStore();

const currentPage = ref(parseInt(route.query?.page) || 1);
const productsList = computed(() => productStore.productsList);
const isLoading = computed(() => productStore.isLoading);
const errorMessage = computed(() => productStore.errorMessage);
const totalPagesCount = computed(() => productStore.totalPagesCount);
const totalItemsCount = computed(() => productStore.totalItemsCount);

onMounted(async () => {
  await fetchData(currentPage.value);
});


watch(
    () => route.query.page,
    async (newPage) => {
      currentPage.value = parseInt(newPage) || 1;
      await fetchData(currentPage.value);
    }
);

watch(
    () => route.query.sort,
    (newSort) => {
      if (newSort) {
        productStore.setSort(newSort);
      }
    }
);

const fetchData = async (page) => {
  await productStore.fetchProducts(page);

  if (route.query.sort) {
    productStore.setSort(route.query.sort);
  }
}

const handlePage = (page) => {
  navigateTo({page});
}

const navigateTo = ({page}) => {
  if (route.query.page !== String(page)) {
    router.push({
      path: route.path,
      query: {...route.query, page}
    });
  }
}
</script>

<style scoped lang="scss" src="./ProductsList.scss"></style>
