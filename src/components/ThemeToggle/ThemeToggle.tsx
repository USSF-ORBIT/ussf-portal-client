import React, { useEffect } from 'react'
import { useTheme } from 'next-themes'
import styles from './ThemeToggle.module.scss'
import { useAnalytics } from 'stores/analyticsContext'
import { useUser } from 'hooks/useUser'
import { useEditThemeMutation } from 'operations/portal/mutations/editTheme.g'
import { SessionUser } from 'types'
import { useGetThemeQuery } from 'operations/portal/queries/getTheme.g'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ThemeToggle = () => {
  const { data } = useGetThemeQuery()
  const { theme, setTheme } = useTheme()
  const { trackEvent } = useAnalytics()
  const { user } = useUser()
  const [handleEditThemeMutation] = useEditThemeMutation()

  useEffect(() => {
    if (data) {
      setTheme(data.theme)
    }
  }, [data])

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
          refetchQueries: ['getTheme'],
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

  const lightTheme = <FontAwesomeIcon icon="fa-solid fa-sun" /> + ' ' + 'light'
  const darkTheme = <FontAwesomeIcon icon="fa-solid fa-moon" /> + ' ' + 'dark'

  return (
    <button
      type="button"
      onClick={() => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        handleThemeChangeAndTracking(user, newTheme)
      }}
      className={styles.toggleButton}
      data-testid="theme-toggle">
      {theme === lightTheme ? darkTheme : lightTheme} mode
    </button>
  )
}

export default ThemeToggle
