<script lang="ts">
import IUser from './types/user'
import { ref } from 'vue'

export default {
    data() {
        return {
            status: false,
            dialog: false,
            chUser: ref<IUser>(),
            users: Array<IUser>(),
            chName: '',
            cookieReset: false
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

        fetch('/users', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                this.users = data.users
            });
    },
    methods: {
        changeUser(id: number) {
            this.chUser = this.users[id]
            this.dialog = true
        },
        updateUser(id: string) {
            fetch('/user/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.chName,
                    cookieReset: this.cookieReset
                })
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.message)
                });
        }
    }
}
</script>

<template>
    <div class="wrapper">
        <v-dialog v-if="dialog">
            <v-card>
                <v-card-title>
                    Benutzer bearbeiten
                </v-card-title>
                <v-card-text>
                    <v-text-field label="Name" v-model="chName"></v-text-field>
                    <v-btn @click="cookieReset = true">Cookie Reset</v-btn>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click=updateUser(chUser?._id!)>Speichern</v-btn>
                    <v-btn @click="dialog = false">Abbrechen</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

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
        <v-divider style="margin-top: 40px; margin-bottom: 40px;"></v-divider>
        <v-table fixed-header>
            <thead>
                <tr>
                    <th class="text-left">Benutzername</th>
                    <th class="text-left">Abgestimmt</th>
                    <th class="text-left">Cookie</th>
                    <th class="text-left">Aktionen</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item, index in users" :key="item._id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.voted ? 'Ja' : 'Nein' }}</td>
                    <td>{{ item.cookie ?? '-' }}</td>
                    <td>
                        <v-btn @click="changeUser(index)" elevation="0" icon="mdi-pencil"></v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>
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