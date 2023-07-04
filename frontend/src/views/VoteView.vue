<script lang="ts">
import { VotingResponse, OptionResponse, ResultResponse, VotingType } from './types/vote';

export default {
    data() {
        return {
            votings: [] as VotingResponse[],
            options: {
            } as { [key: string]: OptionResponse[] },
            erstwunsch: {} as { [key: string]: string },
            zweitwunsch: {} as { [key: string]: string },
            drittwunsch: {} as { [key: string]: string },
        }
    },
    beforeMount() {
        // fetch voting
        fetch('/votings')
            .then(response => response.json())
            .then(data => {
                this.votings = data;
            });
        // fetch options
        this.votings.forEach((voting: VotingResponse) => {
            fetch(`/options?voting=${voting.voting}`)
                .then(response => response.json())
                .then(data => {
                    this.options[voting.voting] = data;
                })
        })
    },
    methods: {
        vote(time: VotingType) {
            if (!this.erstwunsch[time] || !this.zweitwunsch[time] || !this.drittwunsch[time]) {
                alert("Es müssen Erstwunsch, Zweitwunsch und Drittwunsch ausgewählt sein!")
            }
            if (this.erstwunsch[time] == this.zweitwunsch[time] || this.erstwunsch[time] == this.drittwunsch[time] || this.zweitwunsch[time] == this.drittwunsch[time]) {
                alert("Es dürfen keine zwei Wünsche gleich sein!")
            }
            fetch(`/vote?time=${time}`, {
                method: 'POST',
                body: JSON.stringify({
                    vote: [
                        this.erstwunsch[time],
                        this.zweitwunsch[time],
                        this.drittwunsch[time]
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
    <v-expansion-panels>
        <v-expansion-panel v-for="voting, index in votings" v-bind:key="voting.voting">
            <v-expansion-panel-title>
                {{ voting.voting }}
            </v-expansion-panel-title>
            <v-expansion-panel-content>
                <v-list>
                    <v-list-item v-for="option in options[voting.voting]" v-bind:key="option.id">
                        <v-card>
                            <v-card-title>
                                {{ option.name }}
                            </v-card-title>
                            <v-card-actions>
                                <v-btn :color="erstwunsch[voting.voting] == option.name ? 'success' : ''"
                                    @click="erstwunsch[voting.voting] = option.name">Erstwunsch</v-btn>
                                <v-btn :color="zweitwunsch[voting.voting] == option.name ? 'success' : ''"
                                    @click="zweitwunsch[voting.voting] = option.name">Zweitwunsch</v-btn>
                                <v-btn :color="drittwunsch[voting.voting] == option.name ? 'success' : ''"
                                    @click="drittwunsch[voting.voting] = option.name">Drittwunsch</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-list-item>
                </v-list>

                <v-card>
                    <v-card-title>
                        Absenden
                    </v-card-title>
                    <v-card-text>
                        Wahl für {{ voting.voting }} abschließen?
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="vote(voting.voting)">Send it</v-btn>
                    </v-card-actions>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<style scoped></style>
