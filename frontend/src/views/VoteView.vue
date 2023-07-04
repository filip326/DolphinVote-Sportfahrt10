<script lang="ts">

import { VoteData } from "./types/vote";

interface ResData {
    name: string;
    klasse: string;
    timeframe: string;
    options: VoteData[];
    buttons: {
        [key: number]: {
            loading: boolean;
            success?: boolean;
        } | undefined;
    }
}

export default {
    data() {
        return {
            data: {} as ResData
        }
    },
    async beforeMount() {
        try {
            const serverResponse = await fetch("/vote-data", { method: "GET" });
            if (serverResponse.status === 200) {
                // parse data and display
                const data = await serverResponse.json() as ResData;
                this.data = data;

            } else {
                this.$router.push("/");
            }

        } catch {
            this.$router.push("/");
        }
    },
    methods: {
        async select(index: number) {
            this.data.buttons[index] = { loading: true };
            // send data (option_name) to server

            const response = await fetch("/vote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    option_name: this.data["options"][index].options[index].option_name,
                    option_time: this.data.options[index].options[index].time
                })
            });

            if (response.status === 200) {
                // success
                this.data.buttons[index] = { loading: false, success: true }
            } else {
                // error
                this.$router.push("/error");
                this.data.buttons[index] = { loading: false, success: false }
            }

            setTimeout(() => {
                this.data.buttons[index] = undefined;
            }, 3_000);

        }
    }
}

</script>

<template>
    <v-list>
        <v-list-item v-for="(option, index) in data.options" v-bind:key="option.options[index].option_name">
            <v-card>
                <v-card-title>
                    {{ option.options[index].time }} {{ option.options[index].option_name }}
                </v-card-title>
                <v-card-subtitle>
                    {{ option.options[index].free_slots }} freie Plätze übrig
                </v-card-subtitle>
                <v-card-text>
                    <ul>
                        <li v-for="voter in option.options[index].voters">
                            {{ voter.name }} | {{ voter.class }}
                        </li>
                    </ul>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="select(index)" :loading="data.buttons[index]?.loading">
                        Eintragen
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-list-item>
    </v-list>
</template>