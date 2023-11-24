import React, { useContext } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { AuthContext } from "./context/AuthContext"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
