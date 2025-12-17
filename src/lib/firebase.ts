import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAkJ8QqQqQqQqQqQqQqQqQqQqQqQqQqQqQ", // Replace with your config
  authDomain: "your-project.firebaseapp.com", // Replace with your config
  projectId: "your-firebase-project-id", // Replace with your config
  storageBucket: "your-project.appspot.com", // Replace with your config
  messagingSenderId: "123456789", // Replace with your config
  appId: "1:123456789:web:abcdefghijklmnop" // Replace with your config
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Auth functions
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logOut = () => signOut(auth);