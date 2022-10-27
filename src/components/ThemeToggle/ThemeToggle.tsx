import React, { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { withLDConsumer } from 'launchdarkly-react-client-sdk'
import { LDFlagSet } from 'launchdarkly-js-client-sdk'
import styles from './ThemeToggle.module.scss'
import { useAnalytics } from 'stores/analyticsContext'
import { useUser } from 'hooks/useUser'
import { useEditThemeMutation } from 'operations/portal/mutations/editTheme.g'
import { SessionUser } from 'types'
import { useGetThemeQuery } from 'operations/portal/queries/getTheme.g'

const ThemeToggle = ({ flags }: { flags?: LDFlagSet }) => {
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

  return flags && flags.darkModeToggle ? (
    <button
      type="button"
      onClick={() => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        handleThemeChangeAndTracking(user, newTheme)
      }}
      className={styles.toggleButton}
      data-testid="theme-toggle">
      {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  ) : null
}

export default withLDConsumer()(ThemeToggle)
