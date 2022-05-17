import React from 'react'

import styles from './ArticleList.module.scss'

import type { ArticleListItemRecord } from 'types'
import { ArticleListItem } from 'components/ArticleListItem/ArticleListItem'

export const ArticleList = ({
  articles,
}: {
  articles: ArticleListItemRecord[]
}) => {
  return (
    <ol className={styles.ArticleList}>
      {articles.map((article, i) => (
        <li key={`${article.id}_${i}`}>
          <ArticleListItem article={article} />
        </li>
      ))}
    </ol>
  )
}
