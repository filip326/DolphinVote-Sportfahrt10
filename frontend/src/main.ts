import { createApp } from "vue";
import Index from "./Index.vue";

import Homepage from "./pages/Homepage.vue";
import Login from "./pages/Login.vue";
import "vuetify/styles"
import "@mdi/font/css/materialdesignicons.css";
import "./assets/base.css";

import { createRouter, createWebHistory } from "vue-router";

import vuetify from "./plugins/vuetify";

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login
    },
    {
        path: "/home",
        name: "Startseite",
        component: Homepage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

createApp(Index)
    .use(router)
    .use(vuetify)
    .mount("#app");