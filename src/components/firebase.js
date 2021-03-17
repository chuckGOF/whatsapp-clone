// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBAMxhQOtJopPkEuOvvOi1JhQEOjrYlzlU",
    authDomain: "whatsapp-clone-9cddc.firebaseapp.com",
    projectId: "whatsapp-clone-9cddc",
    storageBucket: "whatsapp-clone-9cddc.appspot.com",
    messagingSenderId: "1092352587023",
    appId: "1:1092352587023:web:c4ec0473adabe935ea3a7a",
    measurementId: "G-4TN4L9YR84"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db