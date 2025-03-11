import Vue from 'vue'
import App from './App.vue'
import axiosPlugin from './plugins/axios';
import store from './store/index';
import './assets/main.scss'
import router from './router'

Vue.config.productionTip = false
Vue.config.productionTip = false;
Vue.use(axiosPlugin);

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');


