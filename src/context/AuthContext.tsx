import { createContext } from 'react'
import { type Authentication } from '../api/models'

export const AuthContext = createContext<Authentication>({})
