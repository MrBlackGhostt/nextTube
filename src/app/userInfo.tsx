import { createContext } from "react";
import { useSession } from "next-auth/react";

const userSession = useSession()

export const LoginContext = createContext(userSession)