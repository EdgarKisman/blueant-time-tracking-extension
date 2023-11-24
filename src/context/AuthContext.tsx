import { createContext } from "react"
import { Authentication } from "../api/base/typings"

export const AuthContext = createContext<Authentication>({
  session: undefined,
  onLogin: () => {},
})
