import React from 'react'

import styles from './SearchResultItem.module.scss'

import { Category } from 'components/Tag/Tag'
import { CONTENT_CATEGORIES } from 'constants/index'
import LinkTo from 'components/util/LinkTo/LinkTo'
import { ArticleDateIcon } from 'components/ArticleDateIcon/ArticleDateIcon'

type SearchResultType = 'Article' | 'Bookmark'

type LabelRecord = {
  id: string
  name: string
}

export type SearchResultRecord = {
  id: string
  type: SearchResultType // 'Article' | 'Bookmark'
  title: string // Article.title or Bookmark.label
  preview: string // Article.preview or Bookmark.description
  permalink: string // Article.slug or Bookmark.url
  date?: string // Article.publishedDate
  labels?: LabelRecord[] // Article.labels { id name }
}

export const SearchResultItem = ({ item }: { item: SearchResultRecord }) => {
  const { type, title, preview, permalink, date } = item

  let itemCategory
  let itemIcon
  switch (type) {
    case 'Bookmark':
      itemCategory = CONTENT_CATEGORIES.APPLICATION
      break
    case 'Article': {
      const dateObj = date && new Date(date)
      itemCategory = CONTENT_CATEGORIES.INTERNAL_NEWS
      itemIcon = dateObj && <ArticleDateIcon date={dateObj} />
      break
    }
  }

  return (
    <div className={styles.SearchResultItem}>
      <div className={styles.icon}>{itemIcon}</div>
      <div>
        <h3>
          <LinkTo href={permalink} target="_blank" rel="noreferrer noopener">
            {title}
            <span className="usa-sr-only">(opens in a new window)</span>
          </LinkTo>
        </h3>

        <LinkTo href={permalink} target="_blank" rel="noreferrer noopener">
          {permalink}
          <span className="usa-sr-only">(opens in a new window)</span>
        </LinkTo>

        <p>{preview}</p>

        <div className={styles.metadata}>
          {itemCategory && <Category category={itemCategory} />}
        </div>
      </div>
    </div>
  )
}
