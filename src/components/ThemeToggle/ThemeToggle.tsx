import React, { useEffect } from 'react'
import { useTheme } from 'next-themes'
import styles from './ThemeToggle.module.scss'
import { useAnalytics } from 'stores/analyticsContext'
import { useUser } from 'hooks/useUser'
import { useEditThemeMutation } from 'operations/portal/mutations/editTheme.g'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const { trackEvent } = useAnalytics()
  const { user } = useUser()
  const [handleEditThemeMutation] = useEditThemeMutation()

  useEffect(() => {
    if (user && theme) {
      handleEditThemeMutation({
        variables: {
          userId: user.userId,
          theme: theme,
        },
      })
    }
  }, [user, theme])

  return (
    <button
      type="button"
      onClick={() => {
        trackEvent(
          'Dark mode',
          'Click on light/dark mode toggle',
          'Light/Dark mode toggle'
        )
        setTheme(theme === 'light' ? 'dark' : 'light')
      }}
      className={styles.toggleButton}
      data-testid="theme-toggle">
      {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  )
}

export default ThemeToggle
