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
  const { title, sourceLink, description, publishDate, sourceName } = article

  const x = publishDate.split(' ')
  const MONTH = x[0]
  const DAY = x[1].replace(',', '')

  return (
    <>
      {!widget ? (
        <article>
          <Grid row gap={4}>
            <Grid col="auto">
              <div className={styles.articlePublishedDate}>
                <span className={styles.month}>{MONTH}</span>
                <span className={styles.day}>{DAY}</span>
              </div>
            </Grid>

            <Grid col="fill" gap="05">
              <h3 className={styles.articleTitle}>
                <LinkTo href={sourceLink}>{title}</LinkTo>
              </h3>
              <LinkTo href={sourceLink}>{sourceLink}</LinkTo>
              <p>
                <span>{description}</span>
              </p>
              <Grid row gap={4} className={styles.categoryAndLabel}>
                <Category category={CONTENT_CATEGORIES.EXTERNAL_NEWS} />
                <Label type="Source">{sourceName}</Label>
              </Grid>
            </Grid>
          </Grid>
        </article>
      ) : (
        <article
          className={classnames(styles.NewsListItem, {
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
