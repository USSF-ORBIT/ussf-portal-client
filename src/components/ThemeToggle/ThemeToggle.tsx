import React, { useState } from 'react'
import styles from './ThemeToggle.module.scss'

const ThemeToggle = () => {
  // TODO: Replace this with the actual logic for changing the theme
  const [theme, setTheme] = useState('light')

  const handleTheme = () => {
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
