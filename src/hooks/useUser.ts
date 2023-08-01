import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useAuthContext } from 'stores/authContext'
import { useAnalytics } from 'stores/analyticsContext'
import { useGetUserQuery } from 'operations/portal/queries/getUser.g'
import { PortalUser } from 'types'

export const useUser = () => {
  const { trackRank } = useAnalytics()
  const { user, setPortalUser } = useAuthContext()
  const { loading, data }: PortalUser | any = useGetUserQuery()
  const { setTheme } = useTheme()

  useEffect(() => {
    setPortalUser(data)
    if (data) {
      setTheme(data.theme)
    }
    // TODO: if we have rank
    trackRank('Lt. Col.')
  }, [data])

  return { user, portalUser: data , loading }
}
