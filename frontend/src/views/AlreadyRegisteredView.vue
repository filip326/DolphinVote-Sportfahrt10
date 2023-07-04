<script lang="ts">
export default {
    
}
</script>

<template>

    <v-card prepend-icon="mdi-alert">

        <v-card-title>
            Bereits registriert.
        </v-card-title>

        <v-card-text>
            Kontaktiere einen Lehrer, um ein neues Gerät zu registrieren. Aus Sicherheitsgründen gewähren wir pro Schüler nur eine Registrierung. Falls du ein Gerät ausversehen registriert hast, frage einen Lehrer die Registrierung zu entfernen.
        </v-card-text>


        <v-card-actions>
            <v-btn color="primary" @click="$router.push('/')">
                Zurück
            </v-btn>
        </v-card-actions>

    </v-card>

</template>