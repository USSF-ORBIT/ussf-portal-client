import React, { createContext, useContext, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useAnalytics } from './analyticsContext'
import { SessionUser, PortalUser } from 'types'

export type AuthContextType = {
  user: SessionUser | null
  portalUser: PortalUser | null
  setUser: React.Dispatch<React.SetStateAction<SessionUser | null>>
  setPortalUser: (userData: PortalUser) => void
  logout: () => void
  login: (redirect: string | null) => void
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
  const { setUserIdFn, unsetUserIdFn } = useAnalytics()

  useEffect(() => {
    if (!user) {
      // Fetch user client-side if there is none
      const fetchUser = async () => {
        try {
          const response: AxiosResponse<{ user: SessionUser }> =
            await axios.get('/api/auth/user')
          // Store session in context
          setUser(response.data.user)
        } catch (e) {
          // This (probably) means they aren't logged in
          // don't redirect if they are on the login page already
          // save the path in redirectTo param so we can bring them back
          if (
            router.pathname &&
            router.pathname !== '/login' &&
            router.pathname !== '/'
          ) {
            router.replace(`/login?redirectTo=${router.asPath}`)
          } else {
            router.replace(`/login`)
          }
        }
      }

      fetchUser()
    }
  }, [user])

  useEffect(() => {
    if (user) {
      // Set user ID for analytics
      setUserIdFn(user.attributes.edipi)
    }
  }, [user])

  const login = (redirectTo: string | null) => {
    // Initiate SAML flow
    // TODO - check if cookie exists already?
    if (redirectTo) {
      // pass redirectTo on to saml flow if present
      // RelayState is the parameter that SAML servers understand which will
      // be passed back to us when the auth process is complete
      window.location.href = `/api/auth/login?RelayState=${encodeURIComponent(
        redirectTo
      )}`
    } else {
      window.location.href = '/api/auth/login'
    }
    return
  }

  const logout = async () => {
    try {
      unsetUserIdFn()
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
