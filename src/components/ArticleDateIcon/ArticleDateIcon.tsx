import React from 'react'

import styles from './ArticleDateIcon.module.scss'

export const ArticleDateIcon = ({ date }: { date: Date }) => {
  const dateFormatter = new Intl.DateTimeFormat('en-us', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })

  try {
    const dateParts = dateFormatter.formatToParts(date)
    const { value: month } = dateParts.find((i) => i.type === 'month') || {}
    const { value: day } = dateParts.find((i) => i.type === 'day') || {}

    if (month === undefined || day === undefined) {
      // TODO throw error
      return null
    }

    return (
      <time dateTime={date.toLocaleString()} className={styles.ArticleDateIcon}>
        <small>{month}</small>
        <span>{day}</span>
      </time>
    )
  } catch (e) {
    // TODO error boundary
    return null
  }
}
