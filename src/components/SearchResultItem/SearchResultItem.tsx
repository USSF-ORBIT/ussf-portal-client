import React from 'react'

import styles from './SearchResultItem.module.scss'

import type { SearchResultRecord } from 'types/index'
import { Category, Label } from 'components/Tag/Tag'
import { CONTENT_CATEGORIES } from 'constants/index'
import LinkTo from 'components/util/LinkTo/LinkTo'
import { ArticleDateIcon } from 'components/ArticleDateIcon/ArticleDateIcon'

export const SearchResultItem = ({ item }: { item: SearchResultRecord }) => {
  const { type, title, preview, permalink, date, labels } = item

  let itemCategory
  let itemIcon
  switch (type) {
    case 'Bookmark':
      itemCategory = CONTENT_CATEGORIES.APPLICATION
      break
    case 'Article': {
      const dateObj = date && new Date(date)
      itemCategory = CONTENT_CATEGORIES.NEWS
      itemIcon = dateObj && <ArticleDateIcon date={dateObj} />
      break
    }
  }

  return (
    <div className={styles.SearchResultItem}>
      {itemIcon && <div className={styles.icon}>{itemIcon}</div>}
      <div className={styles.content}>
        <h3>
          <LinkTo href={permalink} target="_blank" rel="noreferrer noopener">
            {title}
            <span className="usa-sr-only">(opens in a new window)</span>
          </LinkTo>
        </h3>

        <p>{preview}</p>

        <div className={styles.metadata}>
          {itemCategory && <Category category={itemCategory} />}
          {labels &&
            labels.map((l) => (
              <Label key={`label_${l.id}`} type={l.type}>
                {l.name}
              </Label>
            ))}
        </div>
      </div>
    </div>
  )
}
