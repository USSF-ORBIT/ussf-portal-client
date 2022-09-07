import React, { useState } from 'react'
import styles from './ThemeToggle.module.scss'
import { useAnalytics } from 'stores/analyticsContext'

const ThemeToggle = () => {
  // TODO: Replace this with the actual logic for changing the theme
  const [theme, setTheme] = useState('light')
  const { trackEvent } = useAnalytics()

  const handleTheme = () => {
    trackEvent(
      'Dark mode',
      'Click on light/dark mode toggle',
      'Light/Dark mode toggle'
    )

    if (theme === 'light') {
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    } else {
      localStorage.setItem('theme', 'light')
      setTheme('light')
    }
  }

  return (
    <button
      type="button"
      onClick={handleTheme}
      className={styles.toggleButton}
      data-testid="theme-toggle">
      {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  )
}

export default ThemeToggle
