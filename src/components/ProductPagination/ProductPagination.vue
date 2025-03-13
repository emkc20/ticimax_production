<template>
  <div class="product-pagination">
    <vue-awesome-paginate
        v-model="page"
        :items-per-page="10"
        :total-items="totalPageItem"
        class="custom-pagination"
        next-button-content=">>"
        prev-button-content="<<"
        @click="onClickHandler"
    />
  </div>
</template>


<script setup>
import {ref, watch, defineProps, defineEmits, computed} from 'vue';
import {useRoute} from "vue-router";
import {VueAwesomePaginate} from "vue-awesome-paginate";

const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(['handlePage']);

const route = useRoute();
const page = ref(parseInt(route.query.page) || 1);
const totalPageItem = computed(() => props.totalItems);


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
<style lang="scss" scoped src="./ProductPagination.scss"></style>
