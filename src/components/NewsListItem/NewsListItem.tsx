import React from 'react'
import classnames from 'classnames'
import { Tag } from '@trussworks/react-uswds'

import styles from './NewsListItem.module.scss'

import colors from 'styles/sfds/colors.module.scss'
import LinkTo from 'components/util/LinkTo/LinkTo'

export type NewsListItemArticle = {
  id: string
  thumbnailSrc?: string
  publishDate?: string
  title: string
  description: string
  source: string
  sourceName: string
  sourceLink: string
}

const NewsListItem = ({ article }: { article: NewsListItemArticle }) => {
  const {
    title,
    sourceLink,
    description,
    publishDate,
    thumbnailSrc,
    sourceName,
  } = article

  return (
    <article className={styles.NewsListItem}>
      {thumbnailSrc && (
        <div className={styles.articleImage}>
          <LinkTo href={sourceLink} target="_blank" rel="noreferrer noopener">
            <img src={thumbnailSrc} alt={title} />
          </LinkTo>
        </div>
      )}

      <LinkTo
        href={sourceLink}
        className={classnames(styles.articleLink, 'usa-link--external')}
        target="_blank"
        rel="noreferrer noopener">
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <small>{publishDate} //</small>
        &nbsp;
        <h3>
          <strong>{title}</strong>
        </h3>
      </LinkTo>

      <p className={styles.articleExcerpt}>
        <span className={styles.articleExcerptTruncate}>
          {description}&hellip;
        </span>
        (
        <LinkTo
          href={sourceLink}
          className={classnames(
            styles.articleExcerptLink,
            'usa-link--external'
          )}
          target="_blank"
          rel="noreferrer noopener">
          continue reading
        </LinkTo>
        )
      </p>

      <Tag className={styles.articleTag} background={colors['theme-mars-base']}>
        {sourceName}
      </Tag>
    </article>
  )
}

export default NewsListItem
