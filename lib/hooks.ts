import { auth, firestore } from "./firebase";
import { doc, collection, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IUserContext } from "./context";

// Custom hook to read  auth record and user profile doc
export function useUserData(): IUserContext {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState<String | null>(null);

    useEffect(() => {
        // turn off realtime subscription
        console.log("That one use effect is running, arnt useeffects so goofy????")
        if (user) {
            const userRef = doc(firestore, "users", user?.uid as string);
            getDoc(userRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        setUsername(docSnap.data().username);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            setUsername(null);
        }

        // return unsubscribe;
    }, [user]);

    return { user, username };
}
