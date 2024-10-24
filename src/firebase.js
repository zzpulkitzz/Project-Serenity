import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyCVD6Jnkxec60ymab5qo4M2AG8e84ZjlQ8",
  authDomain: "mental-health-9fcd8.firebaseapp.com",
  projectId: "mental-health-9fcd8",
  storageBucket: "mental-health-9fcd8.appspot.com",
  messagingSenderId: "892842983337",
  appId: "1:892842983337:web:0125bbb49a7a6e98ccceb8",
  measurementId: "G-FL8H17YJ6N"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);