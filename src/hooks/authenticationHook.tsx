import { useState } from "react"
import { AuthData, Authentication, Credentials, RequestError } from "../api/base/typings"
import { login } from "../api/base/requests/login"

const authenticationHook = (): Authentication => {
  const [session, setSession] = useState<AuthData | undefined>(undefined)
  const [error, setError] = useState<RequestError | undefined>(undefined)

  const authenticateUser = (value: Credentials) => {
    login({ username: value.username, password: value.password })
      .then((response) => setSession({ credentials: value, session: response }))
      .catch((error: RequestError) => setError(error))
  }

  const resetError = () => setError(undefined)

  return { session, onLogin: authenticateUser, error, resetError }
}

export default authenticationHook
