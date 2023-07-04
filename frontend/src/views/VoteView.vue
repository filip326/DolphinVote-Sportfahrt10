<script lang="ts">
// import IVoting from './types/vote'

export default {
    data() {
        return {
            votings: Array<any>(),
        }
    }
}
</script>

<template>
    <v-list>
        <v-list-item>
            <v-list-item-title v-for="voting, index in votings">
                {{ voting.name }}
            </v-list-item-title>
        </v-list-item>
    </v-list>
</template>

<style scoped>
</style>
```