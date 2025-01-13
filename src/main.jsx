import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

import { AuthContextProvider } from "./context/authContext.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <App />
      <Toaster />
    </AuthContextProvider>

  </StrictMode>,
)
