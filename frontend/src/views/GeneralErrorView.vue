<template>
    <v-card>
        <v-card-title>
            Fehler
        </v-card-title>
        <v-card-subtitle>
            Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
        </v-card-subtitle>
        <v-card-actions>
            <v-btn color="primary" @click="$router.back()">Zurück</v-btn>
        </v-card-actions>
    </v-card>
</template>