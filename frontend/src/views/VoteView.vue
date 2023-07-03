<script setup lang="ts">

interface VoteData {
    name: string;
    klasse: string;
    options: {
        option_name: string;
        option_description: string;
        option_id: string;
        free_slots: number;
    }[];
}
</script>

<script lang="ts">

export default {
    data() {
        return {
            data: {
                name: "",
                klasse: "",
                options: [] as {
                    option_name: string;
                    option_description: string;
                    option_id: string;
                    free_slots: number;
                }[],
            } as VoteData,
            buttons: {

            } as {
                [key: number]: {
                    loading: boolean;
                }
            }
        }
    },
    async beforeMount() {
        try {
            const serverResponse = await fetch("/vote-data", { method: "GET" });
            if (serverResponse.status === 200) {
                // parse data and display
                const data = await serverResponse.json() as VoteData;
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
            this.buttons[index] = { loading: true };
            // send data (option_name) to server

        }
    }
}

</script>

<template>
    <v-list>
        <v-list-item v-for="(option, index) in data.options" v-bind:key="option.option_name" >
            <v-card>
                <v-card-title>
                    {{ option.option_name }}
                </v-card-title>
                <v-card-subtitle>
                    {{ option.free_slots }} freie Plätze übrig
                </v-card-subtitle>
                <v-card-text>
                    {{ option.option_description }}
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="select(index)" :loading="buttons[index]?.loading" >
                        Eintragen
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-list-item>
    </v-list>
</template>