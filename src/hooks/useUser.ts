import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useAuthContext } from 'stores/authContext'
import { useGetUserQuery } from 'operations/portal/queries/getUser.g'
import { PortalUser } from 'types'

export const useUser = () => {
  const { user, setPortalUser } = useAuthContext()
  const { loading, data }: PortalUser | any = useGetUserQuery()
  const { setTheme } = useTheme()

  useEffect(() => {
    setPortalUser(data)
    if (data) {
      setTheme(data.theme)
    }
  }, [data])

  // loading is a combination of query loading, user session, and portal user data.
  // All need to be present to consider things done loading. At least user should be
  // used.
  return { user, portalUser: data, loading: loading || !(user && data) }
}
