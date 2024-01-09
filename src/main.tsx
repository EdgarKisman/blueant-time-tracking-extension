import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import isNil from 'lodash/isNil'

const rootElement = document.getElementById('root')

if (!isNil(rootElement)) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  console.error('Root element not found')
}
