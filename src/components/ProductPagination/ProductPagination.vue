<template>
  <div class="product-pagination">
    <vue-awesome-paginate
        :total-items="totalItems"
        :items-per-page="10"
        v-model="page"
        @click="onClickHandler"
        prev-button-content="<<"
        next-button-content=">>"
        class="custom-pagination"
    />
  </div>
</template>


<script setup>
import {ref, watch, defineProps, defineEmits} from 'vue';
import {useRoute} from "vue-router";
import {VueAwesomePaginate} from "vue-awesome-paginate";

const {totalItems} = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(['handlePage']);

const route = useRoute();
const page = ref(parseInt(route.query.page) || 1);


const onClickHandler = (page) => {
  emit('handlePage', page);
}

watch(
    () => route.query.page,
    (newPage) => {
      page.value = Number(newPage) || 1;
    }
);


</script>
<style scoped lang="scss" src="./ProductPagination.scss"></style>
