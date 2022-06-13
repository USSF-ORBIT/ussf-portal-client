import React from 'react'

import styles from './SearchResultItem.module.scss'

import { Category } from 'components/Tag/Tag'
import { CONTENT_CATEGORIES } from 'constants/index'
import LinkTo from 'components/util/LinkTo/LinkTo'
import { SearchResultRecord } from 'types/index'

// TODO
// Should bookmarks open in new window? - YES
// Permalink should be property on the CMS item

export const SearchResultItem = ({ item }: { item: SearchResultRecord }) => {
  const { type, title, preview, permalink, date } = item

  const dateFormatter = new Intl.DateTimeFormat('en-us', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
  const dateObj = date && new Date(date)

  let itemCategory
  switch (type) {
    case 'Bookmark':
      itemCategory = CONTENT_CATEGORIES.APPLICATION
      break
    case 'Article':
      itemCategory = CONTENT_CATEGORIES.INTERNAL_NEWS
      break
  }

  return (
    <div className={styles.SearchResultItem}>
      <div className={styles.metadata}>
        {dateObj && (
          <time dateTime={dateObj.toLocaleString()}>
            {dateFormatter.format(dateObj)}
          </time>
        )}

        {itemCategory && <Category category={itemCategory} />}
      </div>

      <h3>{title}</h3>
      <p>{preview}</p>
      <LinkTo href={permalink}>{permalink}</LinkTo>
    </div>
  )
}
