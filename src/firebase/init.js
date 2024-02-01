// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'





// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0LJtEG_r8CeeGiwFL_vUz7uio6U0jep8",
  authDomain: "b42sandbox.firebaseapp.com",
  projectId: "b42sandbox",
  storageBucket: "b42sandbox.appspot.com",
  messagingSenderId: "189889065215",
  appId: "1:189889065215:web:38364588a7b906fd89dcca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init & export firestore service
export const db = getFirestore(app) // ggf plus app als Parameter
// generate & export auth object
export const auth = getAuth()
