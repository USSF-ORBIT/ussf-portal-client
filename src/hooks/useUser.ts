import { useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'

import { SessionUser } from 'types'
import { useAuthContext } from 'stores/authContext'

export const useUser = (ssrUser?: SessionUser) => {
  const authContext = useAuthContext()

  useEffect(() => {
    if (ssrUser) {
      // SSR user means a user was passed in directly from server side props
      authContext.setUser(ssrUser)
    } else if (!authContext.user) {
      // Fetch user client-side if there is none
      const fetchUser = async () => {
        try {
          const response: AxiosResponse<{ user: SessionUser }> =
            await axios.get('/api/auth/user')

          authContext.setUser(response.data.user)
        } catch (e) {
          // This (probably) means they aren't logged in
          window.location.href = '/login'
        }
      }

      fetchUser()
    }
  }, [])

  return authContext
}
