import React from 'react'

import styles from './ArticleListItem.module.scss'

import type { ArticleListItemRecord } from 'types'
import { ArticleDateIcon } from 'components/ArticleDateIcon/ArticleDateIcon'
import LinkTo from 'components/util/LinkTo/LinkTo'

export const ArticleListItem = ({
  article,
}: {
  article: ArticleListItemRecord
}) => {
  const { slug, title, preview, publishedDate } = article

  const publishedDateObj = new Date(publishedDate)

  return (
    <article className={styles.ArticleListItem}>
      <ArticleDateIcon date={publishedDateObj} />
      <div>
        <h4>
          <LinkTo href={`/articles/${slug}`}>{title}</LinkTo>
        </h4>
        <p>{preview}</p>
      </div>
    </article>
  )
}
