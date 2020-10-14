import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/analytics'

var firebaseConfig = {
    apiKey: "AIzaSyAAFMGHejbmnrI5HYgaknkaOLyzBiJRVS0",
    authDomain: "vranks-4f50b.firebaseapp.com",
    databaseURL: "https://vranks-4f50b.firebaseio.com",
    projectId: "vranks-4f50b",
    storageBucket: "vranks-4f50b.appspot.com",
    messagingSenderId: "720882747924",
    appId: "1:720882747924:web:c82be28827108d4512b501",
    measurementId: "G-04J7NRSK6F"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const projectStorage = firebase.storage();
  const projectFirestore = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  
  export { projectStorage, projectFirestore, timestamp };