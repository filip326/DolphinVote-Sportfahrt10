import { createApp } from "vue";

import Index from "./components/IndexPage.vue";
import Homepage from "./views/HomeView.vue";
import "vuetify/styles"
import "@mdi/font/css/materialdesignicons.css";
import "./assets/base.css";

import { createRouter, createWebHistory } from "vue-router";

import vuetify from "./plugins/vuetify";

const routes = [
    {
        path: "/",
        name: "Startseite",
        component: Homepage
    },
    {
        path: "/already-registered", 
        name: "Bereits registriert",
        component: () => import("./views/AlreadyRegisteredView.vue")
    },
    {
        path: "/wrong-credentials",
        name: "Falsche Anmeldedaten",
        component: () => import("./views/WrongCredentialsView.vue")
    },
    {
        path: "/vote",
        name: "Wahl",
        component: () => import("./views/VoteView.vue")
    },
    {
        path: "/error",
        name: "Fehler",
        component: () => import("./views/GeneralErrorView.vue")
    },
    {
        path: '/admin',
        name: "Admin",
        component: () => import("./views/Admin.vue")
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("./views/AdminLogin.vue")
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