import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA3dI1F2VEWwegeKYcfB0p2DIzgOTNi9jk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "spendwise-fd28f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "spendwise-fd28f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "spendwise-fd28f.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1020145899856",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1020145899856:web:f5c78dd4e2818fac9e3455"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;
