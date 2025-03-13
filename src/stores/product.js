import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
import service from '@/service/productApi'

export const useProductStore = defineStore('product', () => {
    const products = ref([]);
    const totalPages = ref(0);
    const totalItems = ref(0);
    const loading = ref(false);
    const error = ref(null);
    const sort = ref('inc');

    const setProducts = (newProducts) => {
        products.value = [...newProducts];
    };

    const setLoading = (isLoading) => {
        loading.value = isLoading;
    };

    const setError = (err) => {
        error.value = err;
    };

    const setSort = (newSort) => {
        sort.value = newSort;

        const sortedProducts = [...products.value].sort((a, b) => {
            if (newSort === 'inc') {
                return a.price - b.price;
            }
            return b.price - a.price;
        });

        products.value = sortedProducts;
    };

    const setTotalPageAndItem = (total) => {
        totalItems.value = total;
        totalPages.value = Math.ceil(total / 10);
    };

    const fetchProducts = async (pageNo) => {
        setLoading(true);
        setError(null);

        const params = {
            limit: 10,
            skip: pageNo,
        };

        try {
            const response = await service.getProductList({limit: params.limit, skip: params.skip});

            if (response.data && response.data.products) {
                setProducts(response.data.products);
                setTotalPageAndItem(response.data.total);
            } else {
                setError('API yanıtı beklenen formatta değil.');
            }
        } catch (err) {
            setError('API isteği sırasında bir hata oluştu.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const productsList = computed(() => products.value);
    const isLoading = computed(() => loading.value);
    const errorMessage = computed(() => error.value);
    const totalPagesCount = computed(() => totalPages.value);
    const totalItemsCount = computed(() => totalItems.value);
    const currentSort = computed(() => sort.value);

    return {
        productsList,
        isLoading,
        errorMessage,
        totalPagesCount,
        totalItemsCount,
        currentSort,
        fetchProducts,
        setSort,
    };
});
