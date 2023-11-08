import React from 'react'
import { Pagination } from '@trussworks/react-uswds'
import styles from './ArticleList.module.scss'

import type { ArticleListItemRecord } from 'types'
import { ArticleListItem } from 'components/ArticleListItem/ArticleListItem'

type ArticleListProps = {
  articles: ArticleListItemRecord[]
  landingPage?: boolean
  pagination?: {
    currentPage: number
    totalPages: number
  }
}
export const ArticleList = ({
  articles,
  landingPage = false,
  pagination,
}: ArticleListProps) => {
  return articles.length > 0 ? (
    <>
      <ol className={styles.ArticleList}>
        {articles.map((article, i) => (
          <li key={`${article.id}_${i}`}>
            <ArticleListItem article={article} landingPage={landingPage} />
          </li>
        ))}
      </ol>

      {pagination && (
        <Pagination
          pathname={window.location.pathname}
          totalPages={pagination.totalPages}
          currentPage={pagination.currentPage}
          className={styles.pagination}
        />
      )}
    </>
  ) : (
    <p className={styles.NoArticlesText}>
      There are no published articles in this category.
    </p>
  )
}
