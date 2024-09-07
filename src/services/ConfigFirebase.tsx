// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmvOZQs52YsUEwntK_xbomRoyTrSxrv4w",
  authDomain: "memoryties-3b498.firebaseapp.com",
  projectId: "memoryties-3b498",
  storageBucket: "memoryties-3b498.appspot.com",
  messagingSenderId: "94415348465",
  appId: "1:94415348465:web:9311e3fabce3d8e3cf7f50",
  measurementId: "G-XV6FWJG8NB",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
