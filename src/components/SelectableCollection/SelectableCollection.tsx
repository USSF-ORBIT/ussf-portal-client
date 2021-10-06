import React from 'react'
import classnames from 'classnames'

import styles from './SelectableCollection.module.scss'

type SelectableCollectionProps = {
  onSelect: () => void
  isSelected: boolean
  children: React.ReactNode | React.ReactNode[]
}

const SelectableCollection = ({
  onSelect,
  isSelected,
  children,
}: SelectableCollectionProps) => {
  const handleSelect = () => {
    onSelect()
  }

  const classes = classnames(styles.selectable, {
    [styles.selected]: isSelected,
  })

  // TODO - try label?
  // Explicitly render collection & bookmarks in here

  const ariaLabel = isSelected ? 'Unselect collection' : 'Select collection'

  return (
    <button
      type="button"
      className={classes}
      onClick={handleSelect}
      aria-label={ariaLabel}>
      <div className={styles.disabled}>{children}</div>
      <div className={styles.overlay}>
        <div className="usa-button usa-button--outline">
          {isSelected ? 'Unselect' : 'Select'}
        </div>
      </div>
    </button>
  )
}

export default SelectableCollection
