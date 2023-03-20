// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCwjd0vvUxdZ11QdniioAty1LeQggfYQPI",
  authDomain: "maintenance-1cd31.firebaseapp.com",
  projectId: "maintenance-1cd31",
  storageBucket: "maintenance-1cd31.appspot.com",
  messagingSenderId: "435664530667",
  appId: "1:435664530667:web:6965bb4ee12d0c52e462ae",
  measurementId: "G-JMKXMQ37XS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
