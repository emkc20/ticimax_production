import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
    modules: {
        product: {
            namespaced: true,
            state: {
                products: [],
                totalPages: null,
                totalItems: null,
                loading: false,
                error: null,
                sort: 'inc',
            },
            mutations: {
                setProducts(state, products) {
                    state.products = products;
                },
                setLoading(state, loading) {
                    state.loading = loading;
                },
                setError(state, error) {
                    state.error = error;
                },
                setSort(state, sort) {
                    const priceStort = state.products.slice().sort((a, b) => {
                        if (state.sort === sort) {
                            return a.price - b.price;
                        }
                        return b.price - a.price;
                    });
                    state.products = priceStort;
                },
                setTotalPageAndItem(state, data) {
                    state.totalPages = Math.ceil(data / 10);
                    state.totalItems = data;
                },
            },
            actions: {
                async fetchProducts({commit, state}, pageNo) {
                    commit('setLoading', true);
                    commit('setError', null);

                    const params = {
                        limit: 10,
                        skip: pageNo,
                        sort: state.sort,
                    };

                    try {
                        const response = await this._vm.$axios.get(`?limit=${params.limit}&skip=${params.skip}`);
                        commit('setProducts', response.data.products);
                        commit('setTotalPageAndItem', response.data.total);
                        commit('setLoading', false);
                    } catch (error) {
                        commit('setError', 'API isteği sırasında bir hata oluştu.');
                        commit('setLoading', false);
                    }
                },
            },
            getters: {
                products: (state) => state.products,
                loading: (state) => state.loading,
                error: (state) => state.error,
                totalPages: (state) => state.totalPages,
                totalItems: (state) => state.totalItems,
                sort: (state) => state.sort,
            },
        },
    },
};
