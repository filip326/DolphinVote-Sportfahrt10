<script lang="ts">
export default {
    data() {
        return {
            status: false
        }
    },
    mounted() {
        // fetch /status and set status
        fetch('/status', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                this.status = data.status
            })
    }
}
</script>

<template>
    <div class="wrapper">
        <v-card>
            <v-card-title>
                Start/ Stopp
            </v-card-title>
            <v-card-subtitle>
                Hier können Sie die Wahl {{ status ? 'stoppen' : 'starten' }}
            </v-card-subtitle>
            <v-card-actions>
                <v-btn variant="tonal" width="100%" :href="status ? '/stop' : '/start'">{{ status ? 'Stoppen' :
                    'Starten' }}</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<style scoped>
@media screen and (min-width: 700px) {
    .v-card {
        padding: 20px;
    }

    .v-card-title {
        padding: 6px;
        align-items: center;
        justify-content: center;
        display: flex;
        width: 100%;
        font-size: 24px;
        height: 40px;
    }

    .v-card-subtitle {
        padding: 4px;
        align-items: center;
        justify-content: center;
        display: flex;
        width: 100%;
        font-size: 18px;
        height: 24px
    }

    .wrapper {
        display: flex;
        padding-top: 40px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        gap: 60px;
    }

    .v-card-text {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 10px;
    }
}

@media screen and (max-width: 699.999px) {

    .v-card {
        width: 100%;
    }

    .v-card-title {
        padding: 6px;
        align-items: center;
        justify-content: center;
        display: flex;
        width: 100%;
        font-size: 24px;
        height: 40px;
    }

    .v-card-subtitle {
        padding: 4px;
        align-items: center;
        justify-content: center;
        display: flex;
        width: 100%;
        font-size: 18px;
        height: 24px
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        gap: 20px;
    }

    .v-card-text {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(4, 1fr);
        gap: 10px;
    }

}
</style>