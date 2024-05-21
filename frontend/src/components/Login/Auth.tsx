import React, { createContext, useState, ReactNode } from 'react'

interface AuthContextProps {
  token: string | null
  setToken: (token: string) => void
}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  setToken: () => {},
})

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  )

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}
