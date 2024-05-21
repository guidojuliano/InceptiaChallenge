import React, { useState } from 'react'
import './App.css'
import Inicio from './components/Inicio/Inicio'
import Login from './components/Login/Login'

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState('')

  const handleLoginSuccess = (token: string) => {
    setToken(token)
    setIsAuthenticated(true)
  }

  return (
    <>
      {isAuthenticated ? (
        <Inicio />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  )
}

export default App
