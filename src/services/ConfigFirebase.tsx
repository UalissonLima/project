// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDax-oAxuN9nRM9R2czW9ytCWWB4FPiJBg",
  authDomain: "memoryties-659d0.firebaseapp.com",
  projectId: "memoryties-659d0",
  storageBucket: "memoryties-659d0.appspot.com",
  messagingSenderId: "980724175080",
  appId: "1:980724175080:web:4b7d85da5f577fe1a0395d",
  measurementId: "G-CJCBQ3FBQH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
