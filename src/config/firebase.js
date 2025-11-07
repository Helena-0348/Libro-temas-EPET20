// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth,GoogleAuthProvider,setPersistence,browserLocalPersistence} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALRf8hnImdlSAT4a8jYqCZaJu901OFNbk",
  authDomain: "libro-de-temas-53f4b.firebaseapp.com",
  projectId: "libro-de-temas-53f4b",
  storageBucket: "libro-de-temas-53f4b.firebasestorage.app",
  messagingSenderId: "963091180301",
  appId: "1:963091180301:web:36edb9fc57fa504c005e44",
  measurementId: "G-YE4MFCSF1C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); 

export { auth, provider, db };
export const googleProvider = new GoogleAuthProvider();