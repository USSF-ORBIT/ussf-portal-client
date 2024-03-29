import React from 'react'
import { Grid } from '@trussworks/react-uswds'
import Link from 'next/link'
import styles from './ArticleListItem.module.scss'
import { Category, Label } from 'components/Tag/Tag'
import type { ArticleListItemRecord } from 'types'
import { ArticleDateIcon } from 'components/ArticleDateIcon/ArticleDateIcon'
import { CONTENT_CATEGORIES } from 'constants/index'

export const ArticleListItem = ({
  article,
  landingPage = false,
}: {
  article: ArticleListItemRecord
  landingPage?: boolean
}) => {
  const {
    title,
    preview,
    publishedDate,
    slug,
    sourceLink,
    source = 'CMS',
    sourceName,
    labels,
  } = article

  const slugPath = () => {
    if (sourceLink) {
      return sourceLink
    } else if (landingPage) {
      // If we're on a landing page, we need to add the current path to the slug
      const currentPath = window.location.pathname
      return `${currentPath}/${slug}`
    } else {
      return `/articles/${slug}`
    }
  }

  const publishedDateObj = new Date(publishedDate)

  return (
    <article>
      <Grid row gap={4}>
        <Grid col="auto">
          <ArticleDateIcon date={publishedDateObj} />
        </Grid>

        <Grid col="fill" gap="05">
          <h3 className={styles.articleTitle}>
            <Link href={slugPath()} target="_blank" rel="noreferrer noopener">
              {title}
            </Link>
          </h3>
          <p className={styles.listItemContent}>
            <span className={styles.previewText}>{preview}</span>
          </p>
          <Grid row gap={4} className={styles.categoryAndLabel}>
            <Category category={CONTENT_CATEGORIES.NEWS} />

            {source === 'CMS' && labels && labels.length > 0 && (
              <>
                {labels.map((label) => {
                  return (
                    <Label key={label.id} type={label.type}>
                      {label.name}
                    </Label>
                  )
                })}
              </>
            )}

            {source === 'RSS' && <Label type="Source">{sourceName}</Label>}
          </Grid>
        </Grid>
      </Grid>
    </article>
  )
}
