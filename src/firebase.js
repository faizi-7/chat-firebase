// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCU5P--6otRlT_rAPWAsVYAAWw79HlBbJE",
  authDomain: "chat-98a1c.firebaseapp.com",
  projectId: "chat-98a1c",
  storageBucket: "chat-98a1c.appspot.com",
  messagingSenderId: "971459088854",
  appId: "1:971459088854:web:7a4694535e6fd545b99477"
};

export const app = initializeApp(firebaseConfig);
export const auth= getAuth()
export const storage = getStorage();
export const db = getFirestore(app);
