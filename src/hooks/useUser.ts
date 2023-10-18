import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useAuthContext } from 'stores/authContext'
import {
  useGetUserQuery,
  GetUserQueryHookResult,
} from 'operations/portal/queries/getUser.g'
import { PortalUser } from 'types'

export const useUser = () => {
  const { user, setPortalUser } = useAuthContext()
  const { loading, data }: GetUserQueryHookResult = useGetUserQuery()
  const { setTheme } = useTheme()

  useEffect(() => {
    setPortalUser(data as PortalUser)
    if (data) {
      setTheme(data.theme)
    }
  }, [data])

  // loading is a combination of query loading, user session, and portal user data.
  // All need to be present to consider things done loading. At least user should be
  // used.
  return { user, portalUser: data, loading: loading || !(user && data) }
}
