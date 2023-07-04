<script lang="ts">
// import IVoting from './types/vote'

export default {
    data() {
        return {
            openVotings: [
                // sample
                {
                    voting: 'Voting 1',
                    open: true
                },
                {
                    voting: 'Voting 2',
                    open: false
                }
            ] as { voting: string, open: boolean, _id: string }[],
            votingResults: {
                "Sample": "Activity 1"
            } as {
                [title: string]: string
            }
        }
    },
    methods: {
        async loadOpenVotings() {
            // http get /votings
            // reponse: [ { voting: string, open: boolean }]

            const response = await fetch('/votings', {
                method: 'GET',
            });

            if (response.status === 200) {
                const data = await response.json() as { voting: string, open: boolean, _id: string }[];
                this.openVotings = data;
            } else throw new Error("Error loading open votings");

        },
        async loadVotingResults() {
            // http get /results
            // reponse: { [title: string]: string }

            const response = await fetch('/results', {
                method: 'GET',
            });

            if (response.status === 200) {
                const data = await response.json() as { [title: string]: string };
                this.votingResults = data;
            } else throw new Error("Error loading voting results");
        }
    },
    async beforeMount() {
        try {
            await Promise.all([this.loadOpenVotings(), this.loadVotingResults()]);
        } catch {
            // this.$router.push("/")
        }
    }
}
</script>

<template>
    <v-card>
        <v-card-title>
            Wahlen
        </v-card-title>
        <v-card-subtitle>
            Hier kannst du wählen
        </v-card-subtitle>
        <v-card-text>
            <v-list>
                <v-list-item v-for="(vote, index) in openVotings" :key="index">
                    <v-list-item-title>{{ vote.voting }}</v-list-item-title>
                    <v-list-item-action>
                        <v-btn v-if="vote.open" variant="outlined">Wählen</v-btn>
                        <div v-else class="vote-closed">Bereits gewählt</div>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
    <v-card>
        <v-card-title>
            Ergebnisse
        </v-card-title>
        <v-card-subtitle>
            Du wurdest zu folgenden Aktivitäten zugeteilt
        </v-card-subtitle>
        <v-card-text>
            <v-list v-if="Object.keys(votingResults).length > 0">
                <v-list-item v-for="result in Object.keys(votingResults)" :key="result">
                    <v-list-item-title>{{ result }}</v-list-item-title>
                    <div>
                        {{ votingResults[result] }}
                    </div>
                </v-list-item>
            </v-list>
            <p v-else>
                Es wurden noch keine Ergebnisse bekanntgegeben.
            </p>
        </v-card-text>
    </v-card>
</template>

<style scoped>
</style>
```