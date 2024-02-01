<template>
    <h1 class="text-h3 mb-6">Love Poem Archive</h1>

    <v-btn color="primary" @click="fbfetch('tWLgsrwlFdZAL5d2a4TO')">fetch</v-btn>
    <br /><br />
    <v-btn color="primary" @click="gpt('what is the meaning of love')">gpt</v-btn>


    <v-card v-for="poem in poemsFirestore" :key="poem.id" variant="tonal" color="pink" class="pa-2 mb-4"
        @click="showPoemDetails[poem.id] = !showPoemDetails[poem.id]">
        <v-card-title>
            {{ poem.nameOfLovedOne }}
        </v-card-title>
        <v-card-text>
            <div v-html="poem.response"></div>

            <div v-if="showPoemDetails[poem.id]" class="poemDetails mt-9 textbody-2">
                {{ formatDateUsingDateFns(poem.timestamp.toDate()) }} <br /> <br />

                <v-btn v-if="!confirmDelete[poem.id]" color="gray" class="text-none"
                    @click.stop="confirmDelete[poem.id] = !confirmDelete[poem.id]">delete</v-btn>

                <div v-else>
                    <v-btn color="error" class="text-none" @click="deletePoem(poem.id)">confirm
                        delete</v-btn>
                    <v-btn color="blue-grey-lighten-2" class="text-none ml-4"
                        @click.stop="confirmDelete[poem.id] = !confirmDelete[poem.id]">cancel</v-btn>
                </div>

            </div>

        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue';

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
// const tab = ref('add');
// const nameOfLovedOne = ref('');
// const whereWeMet = ref('');
// const whatWeDoTogether = ref('');
// const howLongACouple = ref('');
// const loveEvent = ref('Just wanted to say I love you');
// const language = ref('english');
// const generatedPrompt = ref('');
// const response = ref('');
// const responseCardStatus = ref('');
const poemsFirestore = ref([]);
let tempPoems = [];
const showPoemDetails = ref([]);
let confirmDelete = ref([])

//delay function 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


onMounted(() => {
    getPoems();
});

const getPoems = async () => {
    const q = query(
        collection(db, "lovepoems"),
        orderBy('timestamp', 'desc')
    ); // , where("language", "==", "english")
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());

        tempPoems.push({
            id: doc.id,
            ...doc.data()
        });


    });
    poemsFirestore.value = tempPoems;
    tempPoems = []
}

const deletePoem = async (id) => {
    console.log('delete poem', id);



    await deleteDoc(doc(db, "lovepoems", id));
    console.log('deleted');
    getPoems()
}



const formatDateUsingDateFns = (date) => {
    return format(new Date(date), 'dd.MM.yyyy HH:mm');
};

// Fetch Method
const fbfetch = async (id) => {
    try {
        // console.log('ID:', id);
        const url = `http://localhost:5000/lovepoems-adf11/us-central1/getLovePoem?id=${id}`;
        // console.log(url)
        const response = await fetch(url);
        const data = await response.json();

        console.log('Data received using Fetch:', data);
    } catch (error) {
        console.log('Error using Fetch:', error);
    }
};


// gpt call 
const gpt = async (prompt) => {
    try {
        // console.log('ID:', id);
        //const url = `http://localhost:5000/lovepoems-adf11/us-central1/openaigptcall?prompt=${id}`;
        const url = `http://localhost:5000/lovepoems-adf11/us-central1/openaigptcall`;
        console.log(url)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt }),
        });
        const data = await response.json();

        console.log('Data received using gpt:', data.choices[0].message.content);

        console.log('Data received using gpt:', data);
    } catch (error) {
        console.log('Error using Fetch:', error);
    }
};




</script>

<style></style>