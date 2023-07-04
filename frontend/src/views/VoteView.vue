<script lang="ts" setup>
import { stringify } from 'querystring';
import { VotingResponse, OptionResponse, ResultResponse, VotingType } from './types/vote';
</script>

<script lang="ts">
export default {
    data: () => ({
        votings: [] as { voting: string, open: boolean }[],
        results: {} as { [key: string]: string | undefined },
        options: {} as { [key: string]: { id: string, name: string }[] },
        success: {} as { [key: string]: boolean },
        values: {} as { [key: string]: [string, string, string] },
        optionsLoadButton: {} as { [key: string]: { loading?: boolean } },
        submitButton: {} as { [key: string]: { loading?: boolean } }
    }),
    methods: {
        async getVotings() {
            const response = await fetch("/votings");
            if (response.status === 401) {
                this.$router.push("/");
                return;
            }
            this.votings = (await response.json() as { voting: string, open: boolean }[])

            for (let voting of this.votings) {
                this.values[voting.voting] = ['', '', ''];
                this.optionsLoadButton[voting.voting] = { loading: false};
                this.submitButton[voting.voting] = { loading: false };
                this.success[voting.voting] = false;
            }

        },

        async getResults() {
            const response = await fetch("/result");
            if (response.status === 401) {
                this.$router.push("/");
                return;
            }

            // const results = await response.json() as { [key: string]: string };
            // this.results = results;
        },

        async getOptions(time: string) {
            const response = await fetch(`/options?time=${time}`);
            if (response.status === 401) {
                this.$router.push("/");
                return;
            }

            const options = await response.json() as { id: string, name: string }[];
            console.table(options);
            this.options[time] = options;
        },

        async submit(time: string) {
            // set loading
            this.submitButton[time] = { loading: true };

            // check if all options are selected
            if (this.values[time][0] === '' || this.values[time][1] === '' || this.values[time][2] === '') {
                this.submitButton[time] = { loading: false };
                return;
            }

            // make ids out of the option names
            const answersAsIds = this.values[time].map(v => this.options[time].find(o => o.name === v)?.id);

            // check if all options are valid ids in the options array
            if (!this.options[time].map(v => v.id).includes(answersAsIds[0] ?? "") || !this.options[time].map(v => v.id).includes(answersAsIds[1] ?? "") || !this.options[time].map(v => v.id).includes(answersAsIds[2] ?? "")) {
                this.submitButton[time] = { loading: false };
                alert("Du hast eine ungültige Option gewählt!");
                return;
            }

            // check if all options are different
            if (this.values[time][0] === this.values[time][1] || this.values[time][0] === this.values[time][2] || this.values[time][1] === this.values[time][2]) {
                this.submitButton[time] = { loading: false };
                alert("Du musst drei verschiedene Optionen wählen!");
                return;
            }

            // send request
            const response = await fetch(`/vote?time=${time}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([
                    answersAsIds[0],
                    answersAsIds[1],
                    answersAsIds[2]
                ])
            });

            // check if request was successful
            if (response.status !== 200) {
                this.$router.push("/error");
                return;
            }

            // reset loading
            this.submitButton[time] = { loading: false };


            this.options[time] = [];
            // delete options
            delete this.options[time];

            // set success to true
            this.success[time] = true;
        }

    },
    async beforeMount() {
        await this.getVotings();
        await this.getResults();
        console.log("Everything parsed")
        console.table(this.votings)
        console.log(this.results)
    }
}
</script>

<template>
    <v-card v-for="voting in votings">
        <v-card-title>{{ voting.voting }}</v-card-title>
        <v-card-subtitle v-if="voting.open">Jetzt wählen</v-card-subtitle>
        <v-card-subtitle v-else>Du kannst hier nicht mehr wählen</v-card-subtitle>
        <!-- if voting.open and there are some options for the voting -->
        <v-card-text v-if="voting.open && options[voting.voting] !== undefined && options[voting.voting].length > 0">
            <div class="choice">
                <v-select
                    :items="options[voting.voting].map(v => v.name)"
                    label="1. Wunsch"
                    v-model="values[voting.voting][0]"></v-select>
            </div>
            <div class="choice">
                <v-select
                    :items="options[voting.voting].filter(v => v.name !== values[voting.voting][0]).map(v => v.name)"
                    label="2. Wunsch"
                    v-model="values[voting.voting][1]"></v-select>
            </div>
            <div class="choice">
                Drittwahl:
                <v-select
                    :items="options[voting.voting].filter(v => v.name !== values[voting.voting][0] && v.name !== values[voting.voting][1]).map(v => v.name)"
                    label="3. Wunsch"
                    v-model="values[voting.voting][2]"></v-select>
            </div>
        </v-card-text>
        <!-- success message -->
        <v-card-text v-if="success[voting.voting]">
            Deine Wahl wurde erfolgreich gespeichert.
        </v-card-text>

        <!-- wahl locked message -->
        <v-card-text v-if="!voting.open && !success[voting.voting] && !results[voting.voting]">
            Du kannst hier nicht, noch nicht oder nicht mehr wählen.
        </v-card-text>

        <!-- result -->
        <v-card-text v-if="results[voting.voting]">
            Dein zugeteiltes Projekt: {{ results[voting.voting] }}
        </v-card-text>

        <!-- if voting is open but there are no options for the voting -->
        <v-card-text
            v-if="voting.open && (!options[voting.voting] || options[voting.voting].length === 0) && !success[voting.voting] && !results[voting.voting]">
            <v-btn @click="getOptions(voting.voting)" :loading="optionsLoadButton[voting.voting].loading">Optionen
                laden</v-btn>
        </v-card-text>
        <!-- if voting is open, there are options and all options are selected, show a submit button -->
        <v-card-actions
            v-if="voting.open && options[voting.voting] !== undefined && options[voting.voting].length > 0">
            <v-btn @click="submit(voting.voting)">Absenden</v-btn>
        </v-card-actions>
    </v-card>
</template>