// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6vl3ZICJw7WcpYTFQBaMC7h60aEBxMtQ",
  authDomain: "yt-courses-9a615.firebaseapp.com",
  projectId: "yt-courses-9a615",
  storageBucket: "yt-courses-9a615.appspot.com",
  messagingSenderId: "286632954156",
  appId: "1:286632954156:web:4a7c14a78de733f4e14489",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
