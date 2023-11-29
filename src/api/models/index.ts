export type Credentials = {
  username: string
  password: string
}

export type BlueAntSession = {
  sessionID: string
  personID: string
}

export type AuthData = {
  credentials: Credentials
  session: BlueAntSession
}

export interface RequestError {
  statusCode: number
  message: string
}

export interface Authentication {
  user?: AuthData
  onLogin?: (value: Credentials) => void
  error?: RequestError
  resetError?: () => void
}
