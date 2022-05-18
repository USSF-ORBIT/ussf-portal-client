import React from 'react'

import styles from './ArticleListItem.module.scss'

import type { ArticleListItemRecord } from 'types'

const ArticleDateBlock = ({ date }: { date: Date }) => {
  const dateFormatter = new Intl.DateTimeFormat('en-us', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })

  const dateParts = dateFormatter.formatToParts(date)
  const { value: month } = dateParts.find((i) => i.type === 'month') || {}
  const { value: day } = dateParts.find((i) => i.type === 'day') || {}
  const { value: year } = dateParts.find((i) => i.type === 'year') || {}

  if (month === undefined || day === undefined || year === undefined) {
    // TODO throw error
  }

  return (
    <time dateTime={date.toLocaleString()} className={styles.ArticleDateBlock}>
      <small>{month}</small>
      <span>{day}</span>
      <small>{year}</small>
    </time>
  )
}

export const ArticleListItem = ({
  article,
}: {
  article: ArticleListItemRecord
}) => {
  // TODO - add permalink to single article page
  const { /* id, slug,*/ title, preview, publishedDate } = article

  const publishedDateObj = new Date(publishedDate)

  return (
    <article className={styles.ArticleListItem}>
      <ArticleDateBlock date={publishedDateObj} />
      <div>
        <h4>{title}</h4>
        <p>{preview}</p>
      </div>
    </article>
  )
}
