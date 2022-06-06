import * as firebase from "firebase/app"
import {initializeApp} from "firebase/app"
import {
    getDatabase,
    ref as firebaseRef,
    set as firebaseSet,
    child,
    get,
    onValue,
    remove,
    push,
} from "firebase/database"

import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    
} from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyAcwT82Pw-yXSqoibrgOlUhSxH10-95ECo",
    authDomain: "kieunamapp-9ad44.firebaseapp.com",
    databaseURL: "https://kieunamapp-9ad44-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kieunamapp-9ad44",
    storageBucket: "kieunamapp-9ad44.appspot.com",
    messagingSenderId: "503952495404",
    appId: "1:503952495404:web:3ee7881154ff85e2435289",
    measurementId: "G-5FEP5SXG87"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase()
const auth=getAuth()

export{
    firebase,
    app,
    database,
    auth,
    onAuthStateChanged,
    firebaseRef,
    firebaseSet,
    get,
    child,
    signInWithEmailAndPassword,
    onValue,
    remove,
    push,
}