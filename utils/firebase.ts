import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB4j5jobpAmTA1qEONI9YQVFvzZTVK_Epg",
  authDomain: "tinycl-fb2a5.firebaseapp.com",
  projectId: "tinycl-fb2a5",
  storageBucket: "tinycl-fb2a5.appspot.com",
  messagingSenderId: "166139891805",
  appId: "1:166139891805:web:ccc8c77311562dc7e23db4",
  measurementId: "G-F8EBLSNLSV"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = firebase.app();
const auth = firebase.auth();
const db = firebase.firestore();

export { app, auth, db };