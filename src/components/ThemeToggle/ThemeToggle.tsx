import React from 'react'
import { useTheme } from 'next-themes'
import styles from './ThemeToggle.module.scss'
import { useAnalytics } from 'stores/analyticsContext'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const { trackEvent } = useAnalytics()

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
