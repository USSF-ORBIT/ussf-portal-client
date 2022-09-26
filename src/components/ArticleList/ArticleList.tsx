import React from 'react'

import styles from './ArticleList.module.scss'

import type { ArticleListItemRecord } from 'types'
import { ArticleListItem } from 'components/ArticleListItem/ArticleListItem'
import Pagination from 'components/Pagination/Pagination'

type ArticleListProps = {
  articles: ArticleListItemRecord[]
  pagination?: {
    currentPage: number
    totalPages: number
  }
}
export const ArticleList = ({ articles, pagination }: ArticleListProps) => {
  return articles.length > 0 ? (
    <>
      <ol className={styles.ArticleList}>
        {articles.map((article, i) => (
          <li key={`${article.id}_${i}`}>
            <ArticleListItem article={article} />
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
