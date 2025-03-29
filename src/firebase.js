// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOLA3KaSeX_WuN137fvXZ-cZiWq9gLGh8",
    authDomain: "userauthetication-35c21.firebaseapp.com",
    projectId: "userauthetication-35c21",
    storageBucket: "userauthetication-35c21.firebasestorage.app",
    messagingSenderId: "707295691668",
    appId: "1:707295691668:web:b9c5285c04350e1b568581",
    measurementId: "G-0NK2YXG4T0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };