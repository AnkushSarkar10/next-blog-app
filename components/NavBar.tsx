import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";


export default function NavBar({}) {
    const { user, username} = useContext(UserContext);

    // const user = null;
    // const username = null;

    return (
        <div className="w-full flex gap-2 items-end md:gap-10 bg-zinc-900 h-16 md:h-24 py-3 pl-4 pr-3 md:py-4 md:pl-40 md:pr-40">
            <Link
                href="/"
                className="bg-black w-fit h-fit py-1 px-3 md:py-3 md:px-4 rounded-md text-base md:text-xl font-semibold text-white border-2"
            >
                <h1>BLAZE</h1>
            </Link>
            {username && (
                <>
                    <Link
                        href="/"
                        className="ml-auto w-fit h-fit py-1 px-3 md:py-3 md:px-4 rounded-md text-base md:text-xl font-medium text-white hover:text-violet-400 hover:underline hover:bg-zinc-800"
                    >
                        <h1>Sign out</h1>
                    </Link>
                    <Link
                        href="/"
                        className=" w-fit h-fit py-1 px-3 md:py-3 md:px-4 rounded-md text-base md:text-xl font-medium text-violet-400 border border-violet-400 hover:text-white hover:bg-violet-500"
                    >
                        <h1>Create Post</h1>
                    </Link>
                    <Link href="/" className="w-fit h-fit ">
                        {/* <img src={user?.photoURL} alt="pic" /> */}
                    </Link>
                </>
            )}
            {!username && (
                <>
                    <Link
                        href="/enter"
                        className="ml-auto w-fit h-fit py-1 px-3 md:py-3 md:px-4 rounded-md text-base md:text-xl font-medium text-white hover:text-violet-400 hover:underline hover:bg-zinc-800"
                    >
                        <h1>Log in</h1>
                    </Link>
                </>
            )}
        </div>
    );
}
