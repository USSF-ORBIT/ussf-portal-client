import React, { useState } from 'react'
import styles from './ThemeToggle.module.scss'

const ThemeToggle = () => {
  // TODO: Replace this with the actual logic for changing the theme
  const [theme, setTheme] = useState('light')

  const handleTheme = () => {
    return theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <button type="button" onClick={handleTheme} className={styles.toggleButton}>
      {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  )
}

export default ThemeToggle
