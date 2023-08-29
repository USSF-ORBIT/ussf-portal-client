import React, { createContext, useContext, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { print } from 'graphql'
import { useRouter } from 'next/router'
import { GetPersonnelDataDocument } from 'operations/portal/queries/getPersonnelData.g'
import { SessionUser, PortalUser } from 'types'

export type AuthContextType = {
  user: SessionUser | null
  portalUser: PortalUser | null
  setUser: React.Dispatch<React.SetStateAction<SessionUser | null>>
  setPortalUser: (userData: PortalUser) => void
  logout: () => void
  login: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  portalUser: null,
  setUser: /* istanbul ignore next */ () => {
    return
  },
  setPortalUser: /* istanbul ignore next */ () => {
    return
  },
  logout: /* istanbul ignore next */ () => {
    return
  },
  login: /* istanbul ignore next */ () => {
    return
  },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [portalUser, setPortalUser] = useState<PortalUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      // Fetch user client-side if there is none
      const fetchUser = async () => {
        let user: SessionUser
        try {
          const response: AxiosResponse<{ user: SessionUser }> =
            await axios.get('/api/auth/user')

          user = {
            ...response.data.user,
          }
          // Query the Portal API for personnel data
          // If this request fails, it should not impact the user's
          // ability to log in, so we catch the error and continue
          try {
            const personnelData: AxiosResponse<any> = await axios.post(
              '/api/graphql',
              {
                // The print fn from graphql converts the js representation
                // of the graphql query to a string that can be sent via axios
                query: print(GetPersonnelDataDocument),
              }
            )
            user = {
              ...user,
              personnelData: {
                ...personnelData.data.data.personnelData,
              },
            }
          } catch (e) {
            console.error('Error fetching portal user data', e)
          }

          // Store session user and personnel data in context
          setUser(user)
        } catch (e) {
          // This (probably) means they aren't logged in
          router.replace('/login')
        }
      }

      fetchUser()
    }
  }, [user])

  const login = () => {
    // Initiate SAML flow
    // TODO - check if cookie exists already?
    window.location.href = '/api/auth/login'
  }

  const logout = async () => {
    try {
      await axios.get('/api/auth/logout')
      setUser(null)
      window.location.href = '/login'
    } catch (e) {
      console.error('Error logging out', e)
      // TODO - fix CORS error when logging out of test IDP
    }
  }

  const context = {
    user,
    portalUser,
    setUser,
    setPortalUser,
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
