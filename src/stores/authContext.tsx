import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'

import { SAMLUser } from 'types'

export type AuthContextType = {
  user: SAMLUser | null
  setUser: React.Dispatch<React.SetStateAction<SAMLUser | null>>
  logout: () => void
  login: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {
    return
  },
  logout: () => {
    return
  },
  login: () => {
    return
  },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<SAMLUser | null>(null)

  const login = () => {
    // Initiate SAML flow
    // TODO - check if cookie exists already?
    window.location.href = '/api/auth/login'
  }

  const logout = async () => {
    await axios.get('/api/auth/logout')
    setUser(null)
    window.location.href = '/login'
  }

  const context = {
    user,
    setUser,
    logout,
    login,
  }

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthContextProvider')
  }

  return context
}
