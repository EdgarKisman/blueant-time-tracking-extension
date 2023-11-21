export type Credentials = {
    readonly username: string
    readonly password: string
}

export type BlueAntSession = {
    sessionID: string
    personID: string
}

export interface RequestError {
    statusCode: number
    message: string
}