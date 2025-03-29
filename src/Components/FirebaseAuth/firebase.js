// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABOViO4QAwF3D3J4yEX2NruTThLai1Lbw",
  authDomain: "exoticbags-2da59.firebaseapp.com",
  projectId: "exoticbags-2da59",
  storageBucket: "exoticbags-2da59.firebasestorage.app",
  messagingSenderId: "435590988243",
  appId: "1:435590988243:web:0bebbfbb6802891b4d2f26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;