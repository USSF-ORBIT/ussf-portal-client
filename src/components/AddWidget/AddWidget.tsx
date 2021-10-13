import React, { useRef } from 'react'
import {
  Button,
  IconAdd,
  IconExpandLess,
  IconExpandMore,
} from '@trussworks/react-uswds'

import styles from './AddWidget.module.scss'

import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import { useCloseWhenClickedOutside } from 'hooks/useCloseWhenClickedOutside'

const AddWidget = ({
  handleSelectCollection,
}: {
  handleSelectCollection: () => void
}) => {
  const dropdownEl = useRef<HTMLLabelElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useCloseWhenClickedOutside(
    dropdownEl,
    false
  )

  const menuOnClick = () => {
    setIsDropdownOpen((state) => !state)
  }

  return (
    <label className={styles.addWidget} htmlFor="addNewWidget" ref={dropdownEl}>
      <span className={styles.plus}>
        <IconAdd />
      </span>
      <DropdownMenu
        toggleEl={
          <button
            className={styles.addWidgetButton}
            type="button"
            id="addNewWidget"
            onClick={menuOnClick}
            aria-label="Add section">
            Add section{' '}
            {isDropdownOpen ? <IconExpandLess /> : <IconExpandMore />}
          </button>
        }
        isActive={isDropdownOpen}>
        <Button type="button" onClick={handleSelectCollection}>
          Select existing collection(s)
        </Button>
      </DropdownMenu>
    </label>
  )
}

export default AddWidget
