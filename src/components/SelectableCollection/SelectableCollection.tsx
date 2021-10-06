import React from 'react'
import classnames from 'classnames'
import { Button } from '@trussworks/react-uswds'

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

  return (
    <div className={classes}>
      <div className={styles.disabled}>{children}</div>
      <div className={styles.overlay}>
        <Button type="button" outline onClick={handleSelect}>
          Select
        </Button>
      </div>
    </div>
  )
}

export default SelectableCollection
