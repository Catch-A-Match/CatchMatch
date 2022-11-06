import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyBhnqt0j1RZWcl344YORMNVLNNbRDrFCjQ",
    authDomain: "catchmatch-20609.firebaseapp.com",
    projectId: "catchmatch-20609",
    storageBucket: "catchmatch-20609.appspot.com",
    messagingSenderId: "890799799475",
    appId: "1:890799799475:web:e4e91f3d8a419bc7d084c6",
    measurementId: "G-RTW6BWVTCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);