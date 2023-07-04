<script lang="ts">
export default {
    data() {
        return {
            rules: {
                required: (value: string) => !!value || 'Dieses Feld ist erforderlich.'
            },
            username: "",
            password: "",
            button: {
                loading: false,
                disabled: false
            },
            error: {
                show: false,
                message: ""
            }
        };
    },
    methods: {
        async login() {
            // disable login button to prevent spamming
            // show loading indicator
            // clear error message

            this.button.disabled = true;
            this.button.loading = true;
            const result = await fetch("/admin-login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: this.username,
                    password: this.password
                })
            }).catch(() => {
                this.button.disabled = false;
                this.button.loading = false;
                this.error.message = "Verbindung zum Server ist fehlgeschlagen!"
                this.error.show = true;
            })

            if (!result) return;

            if (result.status !== 200) {
                this.button.disabled = false;
                this.button.loading = false;
                this.error.message = "Login fehlgeschlagen!"
                this.error.show = true;
            } else {
                this.$router.push("/admin");
            }
        }
    },
    beforeMount() {
        this.button.loading = true;
        fetch("/checkaccess", { method: "GET" })
            .then((response) => {
                if (response.status === 200) {
                    this.$router.push("/home");
                    return;
                }
                this.button.loading = false;
            })
    }
};
</script>


<template>
    <div class="login-wrapper">
        <v-form id="loginform" @submit.prevent="login()">
            <img class="logo" src="/logo.png" alt="Dolphin School" />
            <h1>Login</h1>
            <v-alert v-if="error.show" color="error" :title="error.message"></v-alert>
            <v-text-field v-model="username" clearable label="Benutzername" density="compact" :rules="[rules.required]"
                name="username" />
            <v-text-field v-model="password" type="password" clearable label="Passwort" density="compact"
                :rules="[rules.required]" name="password" />
            <v-btn type="submit" variant="tonal" width="100%" :disabled="button.disabled"
                :loading="button.loading">Login</v-btn>
        </v-form>
    </div>
</template>

<style scoped>
@import url("../assets/login.css");
</style>