<script lang="ts">
export default {
    
}
</script>

<template>

    <v-card prepend-icon="mdi-alert">

        <v-card-title>
            Fehlerhafte Angaben.
        </v-card-title>

        <v-card-text>
            Deine Angaben waren leider nicht korrekt. Bitte überprüfe deine Eingaben und versuche es erneut. Tritt der Fehler wiederholt auf, kontaktiere einen Lehrer oder Systemadmin.
        </v-card-text>


        <v-card-actions>
            <v-btn color="primary" @click="$router.push('/')">
                Zurück
            </v-btn>
        </v-card-actions>

    </v-card>

</template>