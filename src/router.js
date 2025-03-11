import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: "/",
            name: "product",
            component: () => import("@/page/index.vue"),
        },
        {
            path: "/about",
            name: "about",
            component: () => import("@/page/about/index.vue"),
        },
    ]
})
