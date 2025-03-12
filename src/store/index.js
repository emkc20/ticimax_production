import Vuex from 'vuex'
import Vue from 'vue'

import product from "@/store/product";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        product,
    }
})
