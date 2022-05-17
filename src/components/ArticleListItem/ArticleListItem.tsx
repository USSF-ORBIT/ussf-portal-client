import React from 'react'

import styles from './ArticleListItem.module.scss'

import type { ArticleListItemRecord } from 'types'

export const ArticleListItem = ({
  article,
}: {
  article: ArticleListItemRecord
}) => {
  // TODO - style & format date
  const { /* id, slug,*/ title, preview, publishedDate } = article

  const publishedDateObj = new Date(publishedDate)

  return (
    <article className={styles.ArticleListItem}>
      <time dateTime={publishedDate}>
        {publishedDateObj.toLocaleDateString([], {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        })}
      </time>

      <div>
        <h4>{title}</h4>
        <p>{preview}</p>
      </div>
    </article>
  )
}
