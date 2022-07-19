import React from 'react'
import classnames from 'classnames'
import { Grid, Tag } from '@trussworks/react-uswds'
import styles from './NewsListItem.module.scss'
import colors from 'styles/sfds/colors.module.scss'

import { Category, Label } from 'components/Tag/Tag'
import LinkTo from 'components/util/LinkTo/LinkTo'
import type { NewsListItemArticle } from 'types'
import { CONTENT_CATEGORIES } from 'constants/index'

const NewsListItem = ({
  article,
  widget = false,
}: {
  article: NewsListItemArticle
  widget?: boolean
}) => {
  const {
    title,
    sourceLink,
    description,
    publishDate,
    thumbnailSrc,
    sourceName,
  } = article

  let DAY, MONTH, YEAR
  if (publishDate) {
    const dateObject = new Date(publishDate)
    const utcDate = dateObject.toUTCString()

    const dateArr = utcDate.split(' ')
    DAY = dateArr[1]
    MONTH = dateArr[2].toUpperCase()
    YEAR = dateArr[3]
  }

  return (
    <>
      {!widget ? (
        <article>
          <Grid row gap={4}>
            <Grid col="auto">
              {!widget && thumbnailSrc && (
                <div className={styles.articleImage}>
                  <LinkTo
                    href={sourceLink}
                    target="_blank"
                    rel="noreferrer noopener">
                    <img src={thumbnailSrc} alt={title} />
                  </LinkTo>
                </div>
              )}
            </Grid>

            <Grid col="fill">
              <Grid row gap={4}>
                <div className={styles.articlePublishedDate}>
                  <time>
                    {DAY} {MONTH} {YEAR}
                  </time>
                </div>
                <Category category={CONTENT_CATEGORIES.EXTERNAL_NEWS} />
                <Label type="Source">{sourceName}</Label>
              </Grid>
              <h3 className={styles.articleTitle}>
                <strong>{title}</strong>
              </h3>
              <p className={styles.articleExcerpt}>
                <span>{description}</span>
              </p>
            </Grid>
          </Grid>
        </article>
      ) : (
        <article
          className={classnames(styles.NewsListItem, {
            [styles.newsWidgetItem]: widget,
          })}>
          {!widget && thumbnailSrc && (
            <div className={styles.articleImage}>
              <LinkTo
                href={sourceLink}
                target="_blank"
                rel="noreferrer noopener">
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
            {widget ? (
              <h4>{title}</h4>
            ) : (
              <h3>
                <strong>{title}</strong>
              </h3>
            )}
          </LinkTo>

          <p className={styles.articleExcerpt}>
            <span className={styles.articleExcerptTruncate}>
              {description}&hellip;
            </span>
            {!widget && (
              <>
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
              </>
            )}
          </p>

          <Tag
            className={styles.articleTag}
            background={colors['theme-mars-base']}>
            {sourceName}
          </Tag>
        </article>
      )}
    </>
  )
}

export default NewsListItem
