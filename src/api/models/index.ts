export interface Credentials {
  username: string
  password: string
}

export interface BlueAntSession {
  sessionID: string
  personID: string
}

export interface AuthData {
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
