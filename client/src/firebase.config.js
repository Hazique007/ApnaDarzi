import {initializeApp} from 'firebase/app';
import {getAuth} from "firebase/auth"




const firebaseConfig = {
    apiKey: "AIzaSyDPu_C1mmfI4ifLRwvBsP-p6tAiGeEYxoc",
    authDomain: "online-tailoring-2f8a3.firebaseapp.com",
    projectId: "online-tailoring-2f8a3",
    storageBucket: "online-tailoring-2f8a3.firebasestorage.app",
    messagingSenderId: "169332957426",
    appId: "1:169332957426:web:3f3ebe28ecc474002df06b"
  };

  const app = initializeApp(firebaseConfig);

export const auth =getAuth(app);