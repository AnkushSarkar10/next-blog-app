import { User } from "firebase/auth";
import { createContext } from "react";

export interface IUserContext {
    user: User | null | undefined;
    username: String | null;
}

export const UserContext = createContext<IUserContext>({
    user: null,
    username: null,
});
