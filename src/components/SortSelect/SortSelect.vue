<template>
  <div class="sort-select">
    <label class="deneme" for="sort">Fiyata Göre Sırala:</label>
    <select v-model="selectedSort" @change="changeSort">
      <option disabled value="Seçiniz">Seçiniz</option>
      <option value="inc">Artan</option>
      <option value="desc">Azalan</option>
    </select>
  </div>
</template>

<script setup>
import {useProductStore} from '@/stores/product';
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

const selectedSort = ref(route.query.sort || 'Seçiniz');

const {setSort} = productStore;

watch(
    () => route.query.sort,
    (newSort) => {
      if (newSort) {
        selectedSort.value = newSort;
      } else {
        selectedSort.value = 'Seçiniz';
      }
    }
);

const changeSort = () => {
  if (selectedSort.value !== 'Seçiniz') {
    setSort(selectedSort.value);

    router.push({
      path: route.path,
      query: {...route.query, sort: selectedSort.value},
    });
  }
};
</script>

<style lang="scss" scoped src="./SortSelect.scss"></style>
