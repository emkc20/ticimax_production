import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
    state: {
        products: [],
        currentPage: 1,
        totalPages: 1,
        loading: false,
        error: null,
        sort: 'asc',
    },
    mutations: {
        setProducts(state, products) {
            state.products = products;
        },

    },
    actions: {},
    getters: {
        products: (state) => state.products,
        loading: (state) => state.loading,
        error: (state) => state.error,
        currentPage: (state) => state.currentPage,
        sort: (state) => state.sort,
    },
};
