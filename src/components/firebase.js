import firebase from 'firebase';
import 'firebase/storage'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCjNgdRpDzHe6q1PB4AexWMFVEBWpWK-L4",
    authDomain: "clone-12b84.firebaseapp.com",
    projectId: "clone-12b84",
    storageBucket: "clone-12b84.appspot.com",
    messagingSenderId: "748932968251",
    appId: "1:748932968251:web:a5ca005a44b3c86301d11e"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);      

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db , auth , storage};
