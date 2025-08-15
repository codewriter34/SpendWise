import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3dI1F2VEWwegeKYcfB0p2DIzgOTNi9jk",
  authDomain: "spendwise-fd28f.firebaseapp.com",
  projectId: "spendwise-fd28f",
  storageBucket: "spendwise-fd28f.firebasestorage.app",
  messagingSenderId: "1020145899856",
  appId: "1:1020145899856:web:f5c78dd4e2818fac9e3455"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;
