import React from 'react'
import { DocumentRenderer } from '@keystone-6/document-renderer'
import { Tag } from '@trussworks/react-uswds'
import styles from './SingleArticle.module.scss'
import { Label } from 'components/Tag/Tag'
import type { ArticleRecord } from 'types'
import colors from 'styles/sfds/colors.module.scss'

export const SingleArticle = ({ article }: { article: ArticleRecord }) => {
  const {
    title,
    publishedDate,
    body: { document },
    // TODO: Find a way to destructure this.
    // I think I need to use nullish coalescing here,
    // but can't figure out how to write it properly
    // byline: { name: byline },
    // location: { name: location },
    labels,
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
      <div>
        <div className={styles.tagAndLabelContainer}>
          {tags &&
            tags.map((tag) => {
              return (
                <Tag key={`${tag.id}`} background={colors['theme-mars-base']}>
                  {tag.name}
                </Tag>
              )
            })}

          {labels &&
            labels.map((label) => {
              return (
                <Label type={label.type} key={`${label.id}`}>
                  {label.name}
                </Label>
              )
            })}
        </div>

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

          {article.byline && (
            <div>
              <dt>Written by:</dt>
              <dd>{article.byline.name}</dd>
            </div>
          )}

          {article.location && (
            <div>
              <dt>Posted from:</dt>
              <dd>{article.location.name}</dd>
            </div>
          )}
        </dl>
      </div>

      <DocumentRenderer document={document} />
    </article>
  )
}
