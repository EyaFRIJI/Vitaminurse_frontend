// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyCssFsTHwU4UJ-dMlCFTDWXB6ATfiizIn0",
  // authDomain: "vitaminurse-app.firebaseapp.com",
  // projectId: "vitaminurse-app",
  // storageBucket: "vitaminurse-app.appspot.com",
  // messagingSenderId: "682835291227",
  // appId: "1:682835291227:web:ad2ba69245ab22e5f5e37e",

  apiKey: "AIzaSyDdwG9JNyiaxH_twp8eMM-RUz5fLTVLnyk",
  authDomain: "senpai-cf07c.firebaseapp.com",
  projectId: "senpai-cf07c",
  storageBucket: "senpai-cf07c.appspot.com",
  messagingSenderId: "951837853411",
  appId: "1:951837853411:web:a8cd6c10146a2d6d0d27d6",
  measurementId: "G-LZCE8P4V0K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
