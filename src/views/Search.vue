<template>
    <!-- <v-layout> -->
    <!-- <v-main class="ma-6"> -->
    <h1 class="text-h3 mb-6">Sag uns wer Du bist</h1>

    <v-form @submit.prevent="submit">
        <!-- <v-container> -->
        <v-row>
            <v-col cols="12" md="8" xl="4">
                <v-text-field v-model="firstName" label="Vorname" required hide-details class="mb-6"></v-text-field>
                <v-text-field v-model="lastName" label="Nachname" required hide-details class="mb-6"></v-text-field>
                <v-text-field v-model="street" label="Strasse" required hide-details class="mb-6"></v-text-field>
                <v-text-field v-model="housenr" label="Hausnr." required hide-details class="mb-6"></v-text-field>
                <v-text-field v-model="zipcode" label="PLZ" required hide-details class="mb-6"></v-text-field>
                <v-text-field v-model="city" label="Stadt" required hide-details class="mb-6"></v-text-field>

                <!-- 
                    <v-text-field v-model="whereWeMet" label="Where did you meet?" required hide-details
                    class="mb-6"></v-text-field>

                    <v-text-field v-model="whatWeDoTogether" label="What do you like doing together?" required hide-details
                        class="mb-6"></v-text-field>

                    <v-text-field v-model="howLongACouple" label="How long have you been a couple?" required hide-details
                        class="mb-6"></v-text-field>

                    <v-btn-toggle v-model="loveEvent" divided mandatory color="gray" class="mb-6">
                        <v-slide-group>
                            <v-btn value="Just wanted to say I love you">Because I love you</v-btn>
                            <v-btn value="birthday">Birthday</v-btn>
                            <v-btn value="anniversary">Anniversary</v-btn>
                            <v-btn value="valentines">Valentines</v-btn>
                        </v-slide-group>
                    </v-btn-toggle>

                    <p class="text-body-1">write in</p>


                    <v-btn-toggle v-model="language" divided mandatory color="gray">
                        <v-btn value="english" selected="selected">English</v-btn>
                        <v-btn value="german">German</v-btn>
                        <v-btn value="spanish">Spanish</v-btn>
                    </v-btn-toggle>
                -->
            </v-col>
        </v-row>


        <v-row>
            <v-col cols="12" md="8" xl="4">
                <v-btn color="primary" type="submit">infos anfordern</v-btn>
            </v-col>
        </v-row>
        <br /><br />

        <v-row>
            <v-col cols="12" md="8" xl="4">
                <v-card v-if="responseCardStatus == 'gettingResponse'" loading variant="tonal" color=pink class="pa-3">

                </v-card>

                <v-card v-if="responseCardStatus === 'showResponse'" variant="tonal" color=pink class="pa-3">
                    <div v-html="response"></div>
                </v-card>
            </v-col>
        </v-row>

    </v-form>
</template>


<script setup>
import { ref, computed, watchEffect } from 'vue';

//setup router
import { useRoute } from 'vue-router'
const route = useRoute();
const routeParams = route.params;

//import date-fns
import { format } from 'date-fns';

//import firestore instance and relevant functions
import { db } from '../firebase/init.js';


import { collection, addDoc, Timestamp, getDocs, query, orderBy, where, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";


//variables
const nameOfLovedOne = ref('');
const whereWeMet = ref('');
const whatWeDoTogether = ref('');
const howLongACouple = ref('');
const loveEvent = ref('Just wanted to say I love you');
const language = ref('english');
const generatedPrompt = ref('');
const response = ref('');
const responseCardStatus = ref('');
const poemsFirestore = ref([]);
let tempPoems = [];
const showPoemDetails = ref([]);
let confirmDelete = ref([])

//delay function 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//generated prompt
watchEffect(() => {
    generatedPrompt.value = `Generate a love poem for ${nameOfLovedOne.value}. \n`
    generatedPrompt.value += `The poem should have a maximum of 140 words. End on a full paragraph.\n`
    generatedPrompt.value += `The occasion is: ${loveEvent.value}. \n`
    generatedPrompt.value += `The couple met here: ${whereWeMet.value}. \n`
    generatedPrompt.value += `The couple likes doing together: ${whatWeDoTogether.value}. \n`
    generatedPrompt.value += `The couple has been together for: ${howLongACouple.value}. \n`
    generatedPrompt.value += `The poem should be in ${language.value}. \n`
    generatedPrompt.value = generatedPrompt.value.replace(/\n/g, '<br>');
});



// function to save to firebase
const saveToFirebase = async (event) => {
    console.log('fb save');
    //lovepoems collection reference 
    const colRef = collection(db, 'lovepoems');
    //data to send
    const dataObj = {
        nameOfLovedOne: nameOfLovedOne.value,
        whereWeMet: whereWeMet.value,
        whatWeDoTogether: whatWeDoTogether.value,
        howLongACouple: howLongACouple.value,
        loveEvent: loveEvent.value,
        language: language.value,
        generatedPrompt: generatedPrompt.value,
        response: response.value,
        timestamp: Timestamp.now()
    }

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

//get firebase functions for opeinai key
// const functions = require('firebase-functions');
// const openAIsecretKey = functions.config().openai.secret);
// exports.getApiKey = functions.https.onRequest((req, res) => {
//   res.status(200).json({ openAIsecretKey });
//console.log('key ', openAIsecretKey)

const host = window.location.host


//function after submit of form 
const submit = async (event) => {
    //console.log(event, nameOfLovedOne.value);

    responseCardStatus.value = 'gettingResponse'
    //await delay(1500)

    // call openai api function
    //const url = `http://localhost:5001/lovepoems-adf11/us-central1/openaigptcall`;
    let url = '';
    if (host === 'localhost:3000')
        url = `http://127.0.0.1:5001/lovepoems-adf11/us-central1/openaigptcall`;
    else
        url = `https://us-central1-lovepoems-adf11.cloudfunctions.net/openaigptcall`;
    //console.log(url)
    //const response = await fetch(url, {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: generatedPrompt.value }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // This returns another promise
        })
        .then(data => {
            //console.log('data', data)
            responseCardStatus.value = 'showResponse'
            response.value = data.choices[0].message.content
            response.value = response.value.replace(/\n/g, '<br>');
            saveToFirebase()
        })
        .catch(error => console.log('ERROR 47'));

};



const formatDateUsingDateFns = (date) => {
    return format(new Date(date), 'dd.MM.yyyy HH:mm');
};
</script>


<style></style>