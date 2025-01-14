// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvP3CEmiGTL1sUBQ_heBqS_539oAjdbtg",
  authDomain: "fire-auth-demo-e7660.firebaseapp.com",
  projectId: "fire-auth-demo-e7660",
  storageBucket: "fire-auth-demo-e7660.firebasestorage.app",
  messagingSenderId: "378372374569",
  appId: "1:378372374569:web:3c64c55712d90d6e00dc38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };