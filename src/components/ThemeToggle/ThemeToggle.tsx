import React from 'react'
import { useTheme } from 'next-themes'
import styles from './ThemeToggle.module.scss'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={styles.toggleButton}
      data-testid="theme-toggle">
      {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  )
}

export default ThemeToggle
