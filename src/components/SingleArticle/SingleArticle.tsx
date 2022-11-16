import React from 'react'
import { DocumentRenderer } from '@keystone-6/document-renderer'

import styles from './SingleArticle.module.scss'

import type { ArticleRecord } from 'types'

export const SingleArticle = ({ article }: { article: ArticleRecord }) => {
  const {
    title,
    publishedDate,
    hero: { url },
    body: { document },
  } = article

  const dateFormatter = new Intl.DateTimeFormat('en-us', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
  const publishedDateObj = new Date(publishedDate)
  return (
    <article className={styles.SingleArticle}>
      <div className={styles.title}>
        <h2>{title}</h2>

        <dl className={styles.metadata}>
          <dt>Post date:</dt>
          <dd>
            <time dateTime={publishedDateObj.toLocaleString()}>
              {dateFormatter.format(publishedDateObj)}
            </time>
          </dd>
        </dl>
      </div>
      <DocumentRenderer document={document} />
    </article>
  )
}
