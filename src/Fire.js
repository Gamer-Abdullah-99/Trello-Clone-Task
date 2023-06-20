import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getDatabase, ref, set, get, child, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDVvC32B4UMsomtStIme33pkLLwFzS8i3I",
  authDomain: "trello-clone-857d8.firebaseapp.com",
  projectId: "trello-clone-857d8",
  storageBucket: "trello-clone-857d8.appspot.com",
  messagingSenderId: "299600773305",
  appId: "1:299600773305:web:d995c75ce5b8a2c53b1b68",
  measurementId: "G-B0RQN34Q5M",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();
const dbRef = ref(getDatabase());
// const dataRef = firebase.database();

export { signInWithEmailAndPassword, auth, signOut, onAuthStateChanged };

export { dbRef, set, db, get, child, ref, push };
