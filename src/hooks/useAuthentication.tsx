import { useState } from 'react'
import {
  type AuthData,
  type Authentication,
  type Credentials,
  type RequestError
} from '../api/models'
import { login } from '../api/base/login'

const useAuthentication = (): Authentication => {
  const [session, setSession] = useState<AuthData | undefined>(undefined)
  const [error, setError] = useState<RequestError | undefined>(undefined)

  const authenticateUser = (value: Credentials): void => {
    login({ username: value.username, password: value.password })
      .then((response) => {
        setSession({ credentials: value, session: response })
      })
      .catch(setError)
  }

  const resetError = (): void => {
    setError(undefined)
  }

  return { user: session, onLogin: authenticateUser, error, resetError }
}

export default useAuthentication
