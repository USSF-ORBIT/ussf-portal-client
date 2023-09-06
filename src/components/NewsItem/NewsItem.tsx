import React from 'react'
import classnames from 'classnames'
import { Tag } from '@trussworks/react-uswds'
import styles from './NewsItem.module.scss'
import colors from 'styles/sfds/colors.module.scss'

import LinkTo from 'components/util/LinkTo/LinkTo'
import type { NewsItemArticle } from 'types'

const NewsItem = ({
  article,
  widget = false,
}: {
  article: NewsItemArticle
  widget?: boolean
}) => {
  const { title, sourceLink, description, publishDate, sourceName } = article

  return (
    <article
      className={classnames(styles.NewsItem, {
        [styles.newsWidgetItem]: widget,
      })}>
      <LinkTo
        href={sourceLink}
        className={classnames(styles.articleLink, 'usa-link--external')}
        target="_blank"
        rel="noreferrer noopener">
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <small>{publishDate} //</small>
        &nbsp;
        <h4>{title}</h4>
      </LinkTo>

      <p className={styles.articleExcerpt}>
        <span className={styles.articleExcerptTruncate}>
          {description}&hellip;
        </span>
      </p>

      <Tag
        className={styles.articleTag}
        background={colors['theme-mars-lighter']}>
        {sourceName}
      </Tag>
    </article>
  )
}

export default NewsItem
