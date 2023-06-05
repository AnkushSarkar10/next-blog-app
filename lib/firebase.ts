import { data } from "autoprefixer";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    getDocs,
    DocumentSnapshot,
    DocumentData,
    collection,
    query,
    Timestamp
} from "firebase/firestore";
// import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCa8qdPrRFqcbAa-h7zftua7NEw6pxKcMw",
    authDomain: "next-blog-app-3acd3.firebaseapp.com",
    projectId: "next-blog-app-3acd3",
    storageBucket: "next-blog-app-3acd3.appspot.com",
    messagingSenderId: "424889950032",
    appId: "1:424889950032:web:fc388eaeaf13864801d655",
    measurementId: "G-F3248LZV22",
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const firestore = getFirestore();

export function getUserFromUsername(
    username: any
): Promise<DocumentSnapshot<DocumentData>> {
    const userNameRef = doc(firestore, "username", username);
    let uid = null;
    return getDoc(userNameRef).then((docSnap) => {
        const curUID = docSnap.data()?.uid;
        const userRef = doc(firestore, "users", curUID);
        return getDoc(userRef);
    });
}

export function getAllPostsOfUser(uid: string): Promise<DocumentData[]> {
    let posts: DocumentData[] = [];
    const q = query(collection(firestore, `users/${uid}/posts`));
    return getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let json_post = postToJSON(doc);
            posts.push(json_post);
        });
        return posts;
    });
}

// getAllPostsOfUser("PrP6xeM8tUhcxBLeoCb5rIfeEkH3").then((res) => {
//     console.log(res);
// });

export function postToJSON(doc: DocumentData): Object {
    const data = doc.data();
    return {
        ...data,
        createdAt: data.createdAt.toMillis(),
        updatedAt: data.updatedAt.toMillis(),
    };
}

export function JSONToPost(data): DocumentData {
    // const data = doc.data();
    return {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    };
}
