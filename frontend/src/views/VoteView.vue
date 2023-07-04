<script lang="ts">

export default {
    data() {
        return {
            openVotings: [] as { voting: string, open: boolean }[],
            votingResults: []
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
                const data = await response.json() as { voting: string, open: boolean }[];
                this.openVotings = data;
            }

        },
        async loadVotingResults() {
            // http get /
        }
    },
    beforeMount() {

    }
}

</script>

<template>
    
</template>