import { createContext } from "react";
import { AuthData } from "../api/base/typings";

export const AuthContext = createContext<AuthData>({} as AuthData);