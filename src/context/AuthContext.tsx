import { createContext } from "react"
import { Authentication } from "../api/models"

export const AuthContext = createContext<Authentication>({})
