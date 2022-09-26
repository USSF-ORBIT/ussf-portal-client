import React from 'react'
import { useTheme } from 'next-themes'
import { withLDConsumer } from 'launchdarkly-react-client-sdk'
import { LDFlagSet } from 'launchdarkly-js-client-sdk'
import styles from './ThemeToggle.module.scss'
import { useAnalytics } from 'stores/analyticsContext'

const ThemeToggle = ({ flags }: { flags?: LDFlagSet }) => {
  const { theme, setTheme } = useTheme()
  const { trackEvent } = useAnalytics()

  return flags!.darkModeToggle ? (
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
  ) : null
}

export default withLDConsumer()(ThemeToggle)
