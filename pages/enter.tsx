import { auth, googleAuthProvider } from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function EnterPage({}) {
    const { user, username} = useContext(UserContext);

    return (
        <main className="pt-32 pl-20">
            <h1 className="text-3xl font-semibold pb-5">Sign up</h1>
            <SignInButton />
        </main>
    );
}

// TODO
function SignInButton() {
  async function signInWithGoogle(){
    await auth.signInWithPopup(googleAuthProvider).then(
            (result) => {
                console.log(result.user?.email);
            }
        );

  }
    return (
        <>
            <button className="px-4 py-3 border flex gap-2 bg-slate-100 text-lg rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
            onClick={signInWithGoogle}>
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
function SignOutButton() {}
function ChangeUsername() {}
