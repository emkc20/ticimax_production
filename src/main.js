import {createApp} from 'vue';
import {createPinia} from 'pinia';
import App from './App.vue';
import './assets/main.scss';
import router from './router';
import VueStarRating from 'vue-star-rating'
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

const app = createApp(App);
const pinia = createPinia();

app.component('vue-star-rating', VueStarRating);
app.use(VueAwesomePaginate);
app.use(router);
app.use(pinia);

app.mount('#app');
