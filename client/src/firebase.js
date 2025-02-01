import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAbARBKNmJMsycbDJ9uD0hMZ0OD0TeFkZo",
    authDomain: "authentication-otp-8f63f.firebaseapp.com",
    projectId: "authentication-otp-8f63f",
    storageBucket: "authentication-otp-8f63f.firebasestorage.app",
    messagingSenderId: "979800259359",
    appId: "1:979800259359:web:94d9a9e8803fc1510c8e2a",
    measurementId: "G-298DJG9YV6"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
