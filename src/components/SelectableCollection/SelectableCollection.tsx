import React from 'react'
import classnames from 'classnames'
import { Button } from '@trussworks/react-uswds'

import styles from './SelectableCollection.module.scss'

import Collection from 'components/Collection/Collection'
import Bookmark from 'components/Bookmark/Bookmark'
import type { CMSBookmark } from 'types/index'

type SelectableCollectionProps = {
  id: string
  title: string
  bookmarks: CMSBookmark[]
  onSelect: () => void
  isSelected: boolean
  disabled?: boolean
  className?: string
}

const SelectableCollection = ({
  id,
  title,
  bookmarks,
  onSelect,
  isSelected,
  disabled = false,
  className = '',
}: SelectableCollectionProps) => {
  // TODO - what should happen if empty collection? throw error?

  const handleSelect = () => {
    onSelect()
  }

  const classes = classnames(styles.selectable, {
    [styles.selected]: isSelected,
    [styles.disabled]: disabled,
  })

  const ariaLabel = isSelected
    ? `Unselect collection ${title}`
    : `Select collection ${title}`

  return (
    <label htmlFor={`selectCollection_${id}`} className={classes}>
      <div className={styles.disabledCollection}>
        <Collection title={title} className={className}>
          {bookmarks?.map((bookmark) => (
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
        {!disabled && (
          <Button
            id={`selectCollection_${id}`}
            type="button"
            onClick={handleSelect}
            aria-label={ariaLabel}
            className="usa-button usa-button--outline">
            {isSelected ? 'Unselect' : 'Select'}
          </Button>
        )}
      </div>
    </label>
  )
}

export default SelectableCollection
