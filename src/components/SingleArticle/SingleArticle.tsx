import React from 'react'
import { DocumentRenderer } from '@keystone-6/document-renderer'
import { Tag } from '@trussworks/react-uswds'
import styles from './SingleArticle.module.scss'
import type { ArticleRecord } from 'types'
import colors from 'styles/sfds/colors.module.scss'

export const SingleArticle = ({ article }: { article: ArticleRecord }) => {
  const {
    title,
    publishedDate,
    body: { document },
    byline: { name: byline },
    location: { name: location },
    tags,
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
        {tags &&
          tags.map((tag) => {
            return (
              <Tag key={`${tag.id}`} background={colors['theme-mars-base']}>
                {tag.name}
              </Tag>
            )
          })}

        <h2>{title}</h2>

        <dl className={styles.metadata}>
          <div>
            <dt>Post date:</dt>
            <dd>
              <time dateTime={publishedDateObj.toLocaleString()}>
                {dateFormatter.format(publishedDateObj)}
              </time>
            </dd>
          </div>

          {byline && (
            <div>
              <dt>Written by:</dt>
              <dd>{byline}</dd>
            </div>
          )}

          {location && (
            <div>
              <dt>Posted from:</dt>
              <dd>{location}</dd>
            </div>
          )}
        </dl>
      </div>

      <DocumentRenderer document={document} />
    </article>
  )
}
