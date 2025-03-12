import Vue from 'vue'
import App from './App.vue'
import axios from './plugins/axios';
import store from './store/index';
import './assets/main.scss'
import router from './router'
import "bootstrap/dist/css/bootstrap.css";
import VueStarRating from 'vue-star-rating'

Vue.component('vue-star-rating', VueStarRating)


Vue.config.productionTip = false
Vue.config.productionTip = false;
Vue.use(axios);

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');


