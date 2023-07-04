<script lang="ts">
import { VotingResponse, OptionResponse, ResultResponse, VotingType } from './types/vote';

export default {
    data() {
        return {
            voting: {
                open: true,
                voting: 'Mi-Vormittag'
            } as VotingResponse,
            options: [
                {
                    id: 1,
                    name: 'Coding'
                },
                {
                    id: 2,
                    name: 'Tennis'
                },
                {
                    id: 3,
                    name: 'Basketball'
                }
            ],
            result: {
                erstwunsch: 'Coding',
                zweitwunsch: 'Tennis',
                drittwunsch: 'Basketball'
            } as ResultResponse || undefined,
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
            if (!this.erstwunsch || !this.zweitwunsch || !this.drittwunsch) {
                alert("Es müssen Erstwunsch, Zweitwunsch und Drittwunsch ausgewählt sein!")
            }
            if (this.erstwunsch == this.zweitwunsch || this.erstwunsch == this.drittwunsch || this.zweitwunsch == this.drittwunsch) {
                alert("Es dürfen keine zwei Wünsche gleich sein!")
            }
            fetch(`/vote?time=${time}`, {
                method: 'POST',
                body: JSON.stringify({
                    vote: [
                        this.erstwunsch,
                        this.zweitwunsch,
                        this.drittwunsch
                    ]
                })
            }).then(response => response.json())
                .catch(error => {
                    console.log(error)
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
        <v-card-text>
            Erstwunsch: {{ result.erstwunsch }} <br>
            Zweitwunsch: {{ result.zweitwunsch }} <br>
            Drittwunsch: {{ result.drittwunsch }} <br>
        </v-card-text>
    </v-card>
    <v-list v-if="voting.open">
        <v-card v-for="option in options" v-bind:key="option.id">
            <v-card-title>
                {{ option.name }}
            </v-card-title>
            <v-card-actions>
                <v-btn :color="erstwunsch == option.name ? 'success' : ''"
                    @click="erstwunsch = option.name">Erstwunsch</v-btn>
                <v-btn :color="zweitwunsch == option.name ? 'success' : ''"
                    @click="zweitwunsch = option.name">Zweitwunsch</v-btn>
                <v-btn :color="drittwunsch == option.name ? 'success' : ''"
                    @click="drittwunsch = option.name">Drittwunsch</v-btn>
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
    </v-card></template>

<style scoped></style>
