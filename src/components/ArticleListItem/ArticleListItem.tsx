import React from 'react'
import { Grid } from '@trussworks/react-uswds'
import styles from './ArticleListItem.module.scss'
import { Category, Label } from 'components/Tag/Tag'
import type { ArticleListItemRecord } from 'types'
import { ArticleDateIcon } from 'components/ArticleDateIcon/ArticleDateIcon'
import LinkTo from 'components/util/LinkTo/LinkTo'
import { CONTENT_CATEGORIES } from 'constants/index'

export const ArticleListItem = ({
  article,
}: {
  article: ArticleListItemRecord
}) => {
  const { slug, title, preview, publishedDate } = article

  const publishedDateObj = new Date(publishedDate)

  return (
    <article>
      <Grid row gap={4}>
        <Grid col="auto">
          <ArticleDateIcon date={publishedDateObj} />
        </Grid>

        <Grid col="fill" gap="05">
          <h3 className={styles.articleTitle}>
            <LinkTo href={`/articles/${slug}`}>{title}</LinkTo>
          </h3>
          <LinkTo
            href={`/articles/${slug}`}
            target="_blank"
            rel="noreferrer noopener">
            {`/articles/${slug}`}
          </LinkTo>
          <p>
            <span>{preview}</span>
          </p>
          <Grid row gap={4} className={styles.categoryAndLabel}>
            <Category category={CONTENT_CATEGORIES.INTERNAL_NEWS} />
            <Label type="Source">SPACEFORCE.mil</Label>
          </Grid>
        </Grid>
      </Grid>
    </article>
  )
}
