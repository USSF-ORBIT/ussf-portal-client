import React from 'react'
import classnames from 'classnames'
import { Button } from '@trussworks/react-uswds'

import styles from './SelectableCollection.module.scss'

import Collection from 'components/Collection/Collection'
import Bookmark from 'components/Bookmark/Bookmark'
import type { Bookmark as BookmarkType } from 'types/index'

type SelectableCollectionProps = {
  id: string
  title: string
  bookmarks: BookmarkType[]
  onSelect: () => void
  isSelected: boolean
}

const SelectableCollection = ({
  id,
  title,
  bookmarks,
  onSelect,
  isSelected,
}: SelectableCollectionProps) => {
  const handleSelect = () => {
    onSelect()
  }

  const classes = classnames(styles.selectable, {
    [styles.selected]: isSelected,
  })

  const ariaLabel = isSelected
    ? `Unselect collection ${title}`
    : `Select collection ${title}`

  return (
    <label htmlFor={`selectCollection_${id}`} className={classes}>
      <div className={styles.disabled}>
        <Collection title={title}>
          {bookmarks.map((bookmark) => (
            <Bookmark
              key={`bookmark_${bookmark.id}`}
              href={bookmark.url}
              disabled>
              {bookmark.label}
            </Bookmark>
          ))}
        </Collection>
      </div>
      <div className={styles.overlay}>
        <Button
          id={`selectCollection_${id}`}
          type="button"
          onClick={handleSelect}
          aria-label={ariaLabel}
          className="usa-button usa-button--outline">
          {isSelected ? 'Unselect' : 'Select'}
        </Button>
      </div>
    </label>
  )
}

export default SelectableCollection
