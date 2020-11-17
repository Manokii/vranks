import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/functions'
import 'firebase/analytics'

var firebaseConfig = {
  apiKey: "AIzaSyCIoD3oteBZO0wFIQjc9SG_C6C5mYS6QoA",
  authDomain: "blindspotgg.firebaseapp.com",
  databaseURL: "https://blindspotgg.firebaseio.com",
  projectId: "blindspotgg",
  storageBucket: "blindspotgg.appspot.com",
  messagingSenderId: "717769089955",
  appId: "1:717769089955:web:3aea7948d9ec4d2f7f7016",
  measurementId: "G-YCENEXRKBL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth()
const projectFunctions = firebase.functions()
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

if(window.location.hostname === 'localhost') { 
  console.log('running on local firestore')
  projectFirestore.settings({host: 'localhost:5002', ssl: false})
}

export default firebase
export { projectStorage, projectFirestore, timestamp, projectAuth};