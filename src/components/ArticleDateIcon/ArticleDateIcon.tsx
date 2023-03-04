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

    const { value: month } = dateParts.find(
      (i) => i.type === 'month'
    ) as Intl.DateTimeFormatPart
    const { value: day } = dateParts.find(
      (i) => i.type === 'day'
    ) as Intl.DateTimeFormatPart

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
