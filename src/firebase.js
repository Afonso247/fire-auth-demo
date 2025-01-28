// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-3PfLrghp-_fCAusQ3APbsCHmj8WabpA",
  authDomain: "fire-auth-demo2.firebaseapp.com",
  projectId: "fire-auth-demo2",
  storageBucket: "fire-auth-demo2.firebasestorage.app",
  messagingSenderId: "726630978145",
  appId: "1:726630978145:web:3c48d6823ea29a56eed020"
};



// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app); 

export { auth, database, db }; 