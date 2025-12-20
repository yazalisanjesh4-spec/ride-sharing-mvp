import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8Sh-Ig3ymOsnArn-b1dzaOPhPJgn8ol0",
  authDomain: "toggy-ride.firebaseapp.com",
  projectId: "toggy-ride",
  storageBucket: "toggy-ride.firebasestorage.app",
  messagingSenderId: "513768258258",
  appId: "1:513768258258:web:808fc48883b3c2c00a4b0b",
  measurementId: "G-P61XN475B9"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);