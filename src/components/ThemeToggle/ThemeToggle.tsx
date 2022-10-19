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
    if (data && theme && data.theme !== theme) {
      // If there is a discrepancy between what is in the db and what is
      // in local storage, then use what is in local storage.
      setTheme(theme)
    } else if (data) {
      setTheme(data.theme)
    }
    // The dependency list is intentionally left blank so that useEffect only runs once.
    // After the theme is queried and applied, we can rely on updating local storage to serve the theme.
  }, [])

  const handleThemeChangeAndTracking = (
    user: SessionUser | null,
    newTheme: string
  ) => {
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
      })
    }
  }

  return flags && flags.darkModeToggle ? (
    <button
      type="button"
      onClick={() => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        handleThemeChangeAndTracking(user, newTheme)
      }}
      className={styles.toggleButton}
      data-testid="theme-toggle">
      {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  ) : null
}

export default withLDConsumer()(ThemeToggle)
