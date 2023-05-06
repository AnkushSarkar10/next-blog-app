import { auth, firestore } from "./firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IUserContext } from "./context";

// Custom hook to read  auth record and user profile doc
export function useUserData(): IUserContext {
    const [user] = useAuthState(auth as any);
    const [username, setUsername] = useState<String | null>(null);

    useEffect(() => {
        // turn off realtime subscription
        console.log("auth authing")
        let unsubscribe;

        if (user) {
            const ref = firestore.collection("users").doc(user.uid);
            console.log(ref);
            unsubscribe = ref.onSnapshot((doc) => {
                setUsername(doc.data()?.username);
            });
        } else {
            setUsername(null);
        }

        return unsubscribe;
    }, [user]);

    return { user, username };
}
