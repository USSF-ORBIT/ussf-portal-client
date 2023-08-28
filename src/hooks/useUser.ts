import { useEffect } from 'react'
import { print } from 'graphql'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { SessionUser } from 'types'
import { useAuthContext } from 'stores/authContext'
import { GetPersonnelDataDocument } from 'operations/portal/queries/getPersonnelData.g'

export const useUser = (ssrUser?: SessionUser) => {
  const authContext = useAuthContext()
  const router = useRouter()

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

          // Query the Portal API for personnel data
          // #TODO create or find correct response type
          const personnelData: AxiosResponse<any> = await axios.post(
            '/api/graphql',
            {
              // The print fn from graphql converts the js representation
              // of the graphql query to a string that can be sent via axios
              query: print(GetPersonnelDataDocument),
            }
          )

          // Store session user and personnel data in context
          const user: SessionUser = {
            ...response.data.user,
            personnelData: {
              ...personnelData.data.data.personnelData,
            },
          }

          authContext.setUser(user)
        } catch (e) {
          // This (probably) means they aren't logged in
          router.replace('/login')
        }
      }

      fetchUser()
    }
  }, [])

  return authContext
}
