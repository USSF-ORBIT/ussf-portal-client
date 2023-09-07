import React from 'react'
import { useTheme } from 'next-themes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import styles from './ThemeToggle.module.scss'
import { useAnalytics } from 'stores/analyticsContext'
import { useAuthContext } from 'stores/authContext'
import { useUser } from 'hooks/useUser'
import { useEditThemeMutation } from 'operations/portal/mutations/editTheme.g'
import { SessionUser } from 'types'

const lightTheme = (
  <>
    <FontAwesomeIcon icon={faSun} /> light
  </>
)
const darkTheme = (
  <>
    <FontAwesomeIcon icon={faMoon} /> dark
  </>
)

const ThemeToggle = () => {
  const { setTheme } = useTheme()
  const { trackEvent } = useAnalytics()
  const { portalUser } = useAuthContext()
  const { user } = useUser()
  const [handleEditThemeMutation] = useEditThemeMutation()

  // This is necessary to avoid a rehydration error since we render server side
  // See this blog for details: https://www.joshwcomeau.com/react/the-perils-of-rehydration/
  if (!user) {
    return null
  }

  const handleThemeChangeAndTracking = (
    user: SessionUser | null,
    newTheme: string
  ) => {
    try {
      trackEvent(
        'Dark mode',
        'Click on light/dark mode toggle',
        'Light/Dark mode toggle'
      )

      if (user) {
        handleEditThemeMutation({
          variables: {
            userId: user.userId,
            theme: newTheme,
          },
          refetchQueries: ['getUser'],
        })
      }

      setTheme(newTheme)
    } catch (error) {
      // Should this line be ignored? Or logged a different way?
      console.error(
        'Error updating theme: error in handleThemeChangeAndTracking',
        error
      )
    }
  }

  return (
    <button
      type="button"
      onClick={() => {
        const newTheme = portalUser?.theme === 'light' ? 'dark' : 'light'
        handleThemeChangeAndTracking(user, newTheme)
      }}
      className={styles.toggleButton}
      data-testid="theme-toggle">
      {portalUser?.theme === 'light' ? darkTheme : lightTheme} mode{' '}
      <span className="usa-sr-only">(changes visual color theme)</span>
    </button>
  )
}
export default ThemeToggle
