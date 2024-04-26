// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCssFsTHwU4UJ-dMlCFTDWXB6ATfiizIn0",
  authDomain: "vitaminurse-app.firebaseapp.com",
  projectId: "vitaminurse-app",
  storageBucket: "vitaminurse-app.appspot.com",
  messagingSenderId: "682835291227",
  appId: "1:682835291227:web:ad2ba69245ab22e5f5e37e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
