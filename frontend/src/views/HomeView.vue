<script lang="ts">
export default {
    methods: {
        accessCodeValidator() {
            this.code = this.code.toUpperCase().replace(/[^0-9A-Z]/g, "");
        },
        async submit() {
            this.button.loading = true;
            try {
                const response = await fetch("/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        code: this.code,
                        name: this.name,
                    }),
                });
                if (response.status === 200) {
                    this.$router.push("/vote");
                } else if (response.status === 401) {
                    // wrong name, class or code
                    this.$router.push("/wrong-credentials");

                } else if (response.status === 403) {
                    // already registered device
                    this.$router.push("/already-registered");
                } else {
                    this.$router.push("/error");
                }
            } catch {
                this.$router.push("/error");
            }
        }
    },
    data() {
        return {
            button: {
                loading: false,
                disabled: false,
            },
            code: "",
            name: "",
            codeValid: true,
            rules: {
                required(v: string) { return !!v || "Eingabe erforderlich" },
                accessCode(v: string) { return /^[0-9A-Z]{8}$/.test(v) || "Ungültiger Zugangscode" },
            },
        }
    },
}
</script>

<template>
    <v-form>
        <v-card>
            <v-card-title>
                Registrieren
            </v-card-title>
            <v-card-subtitle>
                Gerät registrieren, um an der Wahl teilzunehmen. <b>Für jeden Schüler kann nur ein Gerät registriert
                    werden.</b>
            </v-card-subtitle>

            <v-card-text>
                <v-text-field label="Zugangscode" v-model="code" @update:model-value="accessCodeValidator"
                    :rules="[rules.required, rules.accessCode]" />

                <v-text-field label="Name" v-model="name" :rules="[rules.required]" />
            </v-card-text>

            <v-card-actions>
                <v-btn color="primary" :disabled="!codeValid || button.disabled" :loading="button.loading"
                    @click="submit()">Registrieren</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<style scoped>
@media screen and (min-width: 360px) {
    .next-to {
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-gap: 20px;
    }
}
</style>