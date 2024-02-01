<template>
    <h1 class="text-h3 mb-6">Testform 01</h1>



    <v-row>
        <v-col cols="12" md="6" xl="4">
            <v-card variant="elevated" class="pa-3 mb-6">
                <v-form @submit.prevent="submit">
                    <v-text-field v-model="firstName" label="Vorname" required hide-details class="mb-6"></v-text-field>
                    <v-text-field v-model="lastName" label="Nachname" required hide-details class="mb-6"></v-text-field>
                    <v-text-field v-model="street" label="Strasse" required hide-details class="mb-6"></v-text-field>
                    <v-text-field v-model="housenr" label="Hausnr." required hide-details class="mb-6"></v-text-field>
                    <v-text-field v-model="zipcode" label="PLZ" required hide-details class="mb-6"></v-text-field>
                    <v-text-field v-model="city" label="Stadt" required hide-details class="mb-6"></v-text-field>

                    <v-checkbox v-model="dsgvocheck"
                        label="Ich bin einverstanden mit der Datenschutzerklärung"></v-checkbox>

                    <!-- </v-col>
        </v-row> -->

                    <!-- <div v-if="formStatus !== 'submitted'"> -->
                    <!-- <v-row>
            <v-col cols="12" md="8" xl="4"> -->
                    <v-btn v-if="formStatus !== 'submitted'" color="red" type="submit">schicken sie mir infos zu</v-btn>
                    <v-alert @click="formStatus = null" v-if="formStatus == 'submitted'" type="success" variant="tonal"
                        title="Danke für Ihre Anfrage"
                        text="Wir schicken Ihnen die angeforderten Informationen postwendent zu. "
                        style="cursor: pointer;"></v-alert>
                </v-form>
            </v-card>


            <!-- <v-card v-if="formStatus == 'submitted'" variant="tonal" color=pink class="pa-3 mb-6">
                    <h2 class="text-h4 mb-3">Danke f&uuml;r Ihre Anfrage</h2>
                    <p class="text-subtitle-2 mb-3">Wir schicken Ihnen gerne unseren Prospekt zu:</p>
                    <p class="text-subtitle-2">
                        {{ firstName }} {{ lastName }} <br>
                        {{ street }} {{ housenr }} <br>
                        {{ zipcode }} {{ city }} <br>
                    </p>
                </v-card> -->
        </v-col>

        <v-col cols="12" md="6" xl="4">
            <v-card variant="tonal" color=#91b2f6 class="pa-3 mb-6">
                <h2 class="text-h5 mb-6">Form Submits</h2>

                <v-table>
                    <thead>
                        <tr>
                            <th class="text-left">
                                created at
                            </th>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Adresse
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in submitsFirestore" :key="item.id">
                            <td>{{ formatDateUsingDateFns(item.timestamp) }}</td>
                            <td>{{ item.firstName }} {{ item.lastName }}</td>
                            <td>{{ item.zipcode }}, {{ item.city }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </v-col>
    </v-row>
    <br /><br />
    <!-- </div> -->



    <v-row>
        <v-col cols="12" md="8" xl="4">

        </v-col>
    </v-row>

    <!-- {{ submitsFirestore }} -->
</template>

<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue';

//import firestore instance and relevant functions
import { db } from '../firebase/init.js';
import { collection, addDoc, Timestamp, onSnapshot, getDocs, query as firestoreQuery, orderBy, where, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

let unsubscribe = null;

//import date-fns
import { format } from 'date-fns';

const firstName = ref('');
const lastName = ref('');
const street = ref('');
const housenr = ref('');
const zipcode = ref('');
const city = ref('');
const dsgvocheck = ref('');

const formStatus = ref('');

const submitsFirestore = ref([]);


//function after submit of form 
const submit = async (event) => {
    //console.log(event, nameOfLovedOne.value);

    formStatus.value = 'submitted'
    //await delay(1500)

    saveToFirebase()
    getSubmits()

};

// function to save to firebase
const saveToFirebase = async () => {
    console.log('fb save');
    //lovepoems collection reference 
    const colRef = collection(db, 'testform01submits');
    //data to send
    const dataObj = {
        firstName: firstName.value,
        lastName: lastName.value,
        street: street.value,
        housenr: housenr.value,
        zipcode: zipcode.value,
        city: city.value,
        timestamp: Timestamp.now()
    }
    //timestamp: Timestamp.now()
    //console.log('data object', dataObj);

    //create document and return id
    try {
        // Create document and return id
        const docRef = await addDoc(colRef, dataObj)

        // Access auto-generated id
        console.log('docRef', docRef.id);
    } catch (error) {
        console.error('Error saving to Firebase:', error);
    }

    //access auto generated id
}


onMounted(() => {
    const colRef = collection(db, "testform01submits");
    const query = firestoreQuery(colRef, orderBy('timestamp', 'desc'));

    unsubscribe = onSnapshot(query, (querySnapshot) => {
        const updates = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const timestamp = data.timestamp ? data.timestamp.toDate() : null;
            updates.push({
                id: doc.id,
                ...data,
                timestamp // This will either be the converted Date object or null

                // updates.push({
                //     id: doc.id,
                //     ...doc.data()
            });
        });
        submitsFirestore.value = updates;
    });
});

const formatDateUsingDateFns = (date) => {
    return format(new Date(date), 'dd.MM.yyyy HH:mm');
};


</script>
