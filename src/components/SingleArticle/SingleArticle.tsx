import React from 'react'
import { DocumentRenderer } from '@keystone-6/document-renderer'
import { Tag } from '@trussworks/react-uswds'
import tagStyles from '../Tag/Tag.module.scss'
import styles from './SingleArticle.module.scss'
import { Category, Label } from 'components/Tag/Tag'
import type { ArticleRecord } from 'types'
import { CONTENT_CATEGORIES } from 'constants/index'
import colors from 'styles/sfds/colors.module.scss'

export const SingleArticle = ({ article }: { article: ArticleRecord }) => {
  const {
    title,
    category,
    publishedDate,
    hero,
    body: { document },
    byline,
    location,
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
        {hero && (
          <img
            src={hero.url}
            alt="article hero graphic"
            className={styles.hero}
          />
        )}
        <h2>{title}</h2>
        <div className={styles.tagAndLabelContainer}>
          {category === 'InternalNews' ? (
            <Category category={CONTENT_CATEGORIES.INTERNAL_NEWS} />
          ) : (
            <Tag className={`${tagStyles.Category}`}>{category}</Tag>
          )}

          {labels &&
            labels.map((label) => {
              return (
                <Label type={label.type} key={`${label.id}`}>
                  {label.name}
                </Label>
              )
            })}

          {tags &&
            tags.map((tag) => {
              return (
                <Tag key={`${tag.id}`} background={colors['theme-mars-base']}>
                  {tag.name}
                </Tag>
              )
            })}
        </div>

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
              <dd>{byline.name}</dd>
            </div>
          )}

          {location && (
            <div>
              <dt>Posted from:</dt>
              <dd>{location.name}</dd>
            </div>
          )}
        </dl>
      </div>
      <DocumentRenderer document={document} />
    </article>
  )
}
