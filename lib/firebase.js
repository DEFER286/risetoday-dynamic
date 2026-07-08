import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTqWFJdmXuPvoEnyhcuRcs1V8inFSRGoU",
  authDomain: "rise-d.firebaseapp.com",
  projectId: "rise-d",
  storageBucket: "rise-d.appspot.com",
  messagingSenderId: "837804358810",
  appId: "1:837804358810:web:f47db2ba429c3c129b7323",
  measurementId: "G-PL5R9SXN7B"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
