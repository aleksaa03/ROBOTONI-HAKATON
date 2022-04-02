import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA62POVyUgM7RUkTomn8nK40tm7CpGiDp0",
  authDomain: "hakatobora.firebaseapp.com",
  projectId: "hakatobora",
  storageBucket: "hakatobora.appspot.com",
  messagingSenderId: "946953264319",
  appId: "1:946953264319:web:3bd259cb96c7ec977afa0a",
  measurementId: "G-4VM77NYKY0",
};

/* FACEBOOK AUTH HANDLER */
//https://hakatobora.firebaseapp.com/__/auth/handler

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const database = firebaseApp.database();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { auth };
export { database };
export { storage };
export default firestore;
