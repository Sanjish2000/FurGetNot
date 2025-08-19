import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbdINx6SefSuwfpjtGt4M0rywsMcxj3Dw",
  authDomain: "furgetnot.firebaseapp.com",
  projectId: "furgetnot",
  storageBucket: "furgetnot.firebasestorage.app",
  messagingSenderId: "412132078417",
  appId: "1:412132078417:web:97f1944796487f89195970"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();