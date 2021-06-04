import firebase from 'firebase/app';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDLe0RfxyirZ56zYaowtvdTLDbUwQcwNDU",
    authDomain: "test-intern-fabelio.firebaseapp.com",
    projectId: "test-intern-fabelio",
    storageBucket: "test-intern-fabelio.appspot.com",
    messagingSenderId: "869575951682",
    appId: "1:869575951682:web:fe16548cafa3b5c4f5f4db"
};

firebase.initializeApp(firebaseConfig);

export default firebase;