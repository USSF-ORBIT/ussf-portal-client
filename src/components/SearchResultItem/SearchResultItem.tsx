import React from 'react'

import styles from './SearchResultItem.module.scss'

import { Category } from 'components/Tag/Tag'
import { CONTENT_CATEGORIES } from 'constants/index'
import LinkTo from 'components/util/LinkTo/LinkTo'
import { SearchResultRecord } from 'types/index'
import { ArticleDateIcon } from 'components/ArticleDateIcon/ArticleDateIcon'

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
      <div className={styles.content}>
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
