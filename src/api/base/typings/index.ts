export type Credentials = {
    readonly username: string
    readonly password: string
}

export type UserSession = {
    sessionID: string
    personID: string
}

export interface RequestError {
    errorCode: number
    errorMessage: string
}