import { useState } from "react"
import { AuthData, Authentication, Credentials, RequestError } from "../api/models"
import { login } from "../api/base/login"

const useAuthentication = (): Authentication => {
  const [session, setSession] = useState<AuthData | undefined>(undefined)
  const [error, setError] = useState<RequestError | undefined>(undefined)

  const authenticateUser = (value: Credentials) => {
    login({ username: value.username, password: value.password })
      .then((response) => setSession({ credentials: value, session: response }))
      .catch(setError)
  }

  const resetError = () => setError(undefined)

  return { user: session, onLogin: authenticateUser, error, resetError }
}

export default useAuthentication
