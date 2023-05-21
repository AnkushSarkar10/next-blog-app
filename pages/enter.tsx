import { auth, googleProvider, firestore } from "../lib/firebase";
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { UserContext } from "../lib/context";

export default function EnterPage({}) {
    const { user, username } = useContext(UserContext);

    return (
        <main className="pt-32 pl-20">
            {!username && !user && <SignInButton />}
            {!username && user && <UsernameForm />}
            {username && user && <SignOutButton />}
        </main>
    );
}

// TODO
function SignInButton() {
    function signInWithGoogle() {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                const details = getAdditionalUserInfo(result);
                if (details?.isNewUser) {
                    const userRef = doc(firestore, "users", user.uid);
                    const userData = {
                        displayname: user.displayName,
                        photoURL: user.photoURL,
                        username: null,
                    };
                    return setDoc(userRef, { ...userData });
                } else {
                    console.log("User already exists");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <>
            <h1 className="text-3xl font-semibold pb-5">Sign up</h1>
            <button
                className="px-4 py-3 border flex gap-2 bg-slate-100 text-lg rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
                onClick={signInWithGoogle}
            >
                <img
                    className="w-7 h-7"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                />
                <span>Login with Google</span>
            </button>
        </>
    );
}
function SignOutButton() {
    async function signOut() {
        console.log("sign out");
    }

    return (
        <>
            <button
                className="bg-slate-100 text-slate-700 text-lg font-semibold py-2 px-4 rounded-lg hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
                onClick={signOut}
            >
                Sign Out
            </button>
        </>
    );
}

function UsernameForm() {
    const [formValue, setFormValue] = useState("");
    const [isValid, setIsValid] = useState<Boolean>(false);
    const [loading, setLoading] = useState<Boolean>(false);

    const { user, username } = useContext(UserContext);

    useEffect(() => {
        checkUsername(formValue);
    }, [formValue]);

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // Create refs for both documents

        if (isValid && !loading) {
            const userRef = doc(firestore, "users", user?.uid as string);
            const usernameRef = doc(firestore, "username", formValue);
            setDoc(usernameRef, { uid: user?.uid as string });
            updateDoc(userRef, { username: formValue }).catch((e) => {
                console.log(e);
            });
        }
    }

    function onChange(val: any) {
        const re = /^(?=[a-zA-Z0-9._]{4,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
        if (val.length < 4) {
            setFormValue(val);
            setLoading(false);
            setIsValid(false);
        }

        if (re.test(val)) {
            setFormValue(val);
            setLoading(true);
            setIsValid(false);
        }
    }

    const checkUsername = useCallback(
        debounce((username) => {
            if (username.length >= 3) {
                const usernameRef = doc(firestore, "username", username);
                getDoc(usernameRef).then((docSnap) => {
                    const exists = docSnap.exists();
                    setIsValid(!exists);
                });
                console.log("Firestore read executed!");
                setLoading(false);
            }
        }, 500),
        []
    );

    return (
        <>
            <h1 className="text-3xl font-semibold pb-5">Choose Username</h1>
            <form onSubmit={onSubmit}>
                <div className="pb-3">
                    <input
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="username"
                        value={formValue}
                        onChange={(event) => onChange(event.target.value)}
                    />
                </div>
                <button className="bg-slate-100 text-slate-700 mb-4 text-lg font-semibold py-2 px-4 rounded-lg hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                    Choose
                </button>

                <h3>Debug State</h3>
                <div>
                    Username: {formValue}
                    <br />
                    Loading: {loading.toString()}
                    <br />
                    Username Valid: {isValid.toString()}
                </div>
            </form>
        </>
    );
}
