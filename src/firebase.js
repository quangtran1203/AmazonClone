// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBA4pwtInNmN3QXPDxdaH_RwITfoA7Sydw",
    authDomain: "clone-6b2c5.firebaseapp.com",
    projectId: "clone-6b2c5",
    storageBucket: "clone-6b2c5.appspot.com",
    messagingSenderId: "256247699524",
    appId: "1:256247699524:web:2a3627d03f88f128d6c411",
    measurementId: "G-9ZS8NP67KH"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
