import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDppBOP5yKvjdjfwRNX5zBva4XCcjMP98M",
    authDomain: "fir-demo-ef7a0.firebaseapp.com",
    projectId: "fir-demo-ef7a0",
    storageBucket: "fir-demo-ef7a0.appspot.com",
    messagingSenderId: "203761853533",
    appId: "1:203761853533:web:f94f0f722e4c2c1fe8d9b4",
    measurementId: "G-VNRSZD5C14",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
