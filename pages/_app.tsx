import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import NavBar from "../components/NavBar";

import { UserContext } from "../lib/context";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <UserContext.Provider value={{user: null, username: null}}>
                <NavBar />
                <Component {...pageProps} />
                <Toaster />
            </UserContext.Provider>
        </>
    );
}
