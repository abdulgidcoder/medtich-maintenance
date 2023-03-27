// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDRotttJFaVYbr7pnFRLJ7I0ARnM3qFNww",
  authDomain: "maintenance-eg.firebaseapp.com",
  projectId: "maintenance-eg",
  storageBucket: "maintenance-eg.appspot.com",
  messagingSenderId: "936215758445",
  appId: "1:936215758445:web:e9450dd2f85de7b98f6164",
  measurementId: "G-66C4MJ24FV",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
