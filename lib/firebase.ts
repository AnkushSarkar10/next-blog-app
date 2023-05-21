import { initializeApp } from 'firebase/app'
import  { getAuth, GoogleAuthProvider  } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCa8qdPrRFqcbAa-h7zftua7NEw6pxKcMw",
    authDomain: "next-blog-app-3acd3.firebaseapp.com",
    projectId: "next-blog-app-3acd3",
    storageBucket: "next-blog-app-3acd3.appspot.com",
    messagingSenderId: "424889950032",
    appId: "1:424889950032:web:fc388eaeaf13864801d655",
    measurementId: "G-F3248LZV22"
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const firestore = getFirestore();

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig)
// }
// // console.log(firebase.app);
// export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// export const storage = firebase.storage();