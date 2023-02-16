// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBKcl5vHPhMf5zxU9q6LR0hp9XT7DnToyQ",
  authDomain: "medtich-d43bc.firebaseapp.com",
  databaseURL: "https://medtich-d43bc-default-rtdb.firebaseio.com",
  projectId: "medtich-d43bc",
  storageBucket: "medtich-d43bc.appspot.com",
  messagingSenderId: "358451749330",
  appId: "1:358451749330:web:c7a3b1207156fe812d680b",
  measurementId: "G-XX429S1JND",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
