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

  return { user, portalUser: data, loading }
}
