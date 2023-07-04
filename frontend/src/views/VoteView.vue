<script lang="ts">
import { VotingResponse, OptionResponse, ResultResponse, VotingType } from './types/vote';

export default {
    data() {
        return {
            voting: {} as VotingResponse,
            options: [] as OptionResponse[] || undefined,
            result: {} as ResultResponse || undefined,
            erstwunsch: '',
            zweitwunsch: '',
            drittwunsch: ''
        }
    },
    beforeMount() {
        // fetch voting
        fetch('/votings')
            .then(response => response.json())
            .then(data => {
                this.voting = data;
            })
        if (this.voting.open) {
            // fetch options
            fetch(`/options?time=${this.voting.voting}`)
                .then(response => response.json())
                .then(data => {
                    this.options = data;
                });
        }
        // fetch results
        fetch(`/results`)
            .then(response => response.json())
            .then(data => {
                this.result = data;
            })
    },
    methods: {
        vote(time: VotingType) {
            fetch(`/vote?time=${time}`, {
                method: 'POST',
                body: JSON.stringify([
                    this.erstwunsch,
                    this.zweitwunsch,
                    this.drittwunsch
                ])
            }).then(response => response.json())
                .catch(error => {
                    alert(error);
                })
        }
    }
}
</script>

<template>
    <v-card v-if="result && result.erstwunsch && result.zweitwunsch && result.drittwunsch">
        <v-card-title>
            Deine Ergebnisse
        </v-card-title>
        <v-text>
            Erstwunsch: {{ result.erstwunsch }} <br>
            Zweitwunsch: {{ result.zweitwunsch }} <br>
            Drittwunsch: {{ result.drittwunsch }} <br>
        </v-text>
    </v-card>
    <v-list v-if="voting.open">
        <v-card v-for="option in options" v-bind:key="option.id">
            <v-card-title>
                {{ option.name }}
            </v-card-title>
            <v-card-actions>
                <v-btn @click="erstwunsch = option.name">Erstwunsch</v-btn>
                <v-btn @click="zweitwunsch = option.name">Zweitwunsch</v-btn>
                <v-btn @click="drittwunsch = option.name">Drittwunsch</v-btn>
            </v-card-actions>
        </v-card>
    </v-list>
    <v-card v-if="voting.open">
        <v-card-title>
            Absenden
        </v-card-title>
        <v-card-text>
            Wahl abschließen?
        </v-card-text>
        <v-card-actions>
            <v-btn @click="vote(voting.voting)">Send it</v-btn>
        </v-card-actions>
    </v-card>
</template>

<style scoped></style>
