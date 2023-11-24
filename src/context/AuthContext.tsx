import { createContext } from "react"
import { AuthData, Credentials, RequestError } from "../api/base/typings"

interface AuthContext {
  session: AuthData | undefined
  onLogin: (value: Credentials) => void
  error?: RequestError | undefined
  resetError?: () => void
}

export const AuthContext = createContext<AuthContext>({
  session: undefined,
  onLogin: () => {},
})
