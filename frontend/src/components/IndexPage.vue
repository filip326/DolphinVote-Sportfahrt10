<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
    <v-app>
        <v-app-bar>
            <template v-slot:prepend>
                <v-img src="/logo.png" max-width="64px"/>
            </template>
            <v-app-bar-title>
                DolphinVote
            </v-app-bar-title>
        </v-app-bar>
        <v-main>
            <RouterView />
        </v-main>
    </v-app>
</template>