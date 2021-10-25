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
  handleCreateCollection,
}: {
  handleSelectCollection: () => void
  handleCreateCollection: () => void
}) => {
  const dropdownEl = useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useCloseWhenClickedOutside(
    dropdownEl,
    false
  )

  const menuOnClick = () => {
    setIsDropdownOpen((state) => !state)
  }

  return (
    <div className={styles.addWidget}>
      <DropdownMenu
        toggleEl={
          <button
            className={styles.addWidgetButton}
            type="button"
            id="addNewWidget"
            onClick={menuOnClick}
            aria-label="Add section">
            <span className={styles.plus}>
              <IconAdd role="presentation" />
            </span>
            <br />
            Add section{' '}
            {isDropdownOpen ? (
              <IconExpandLess aria-label="Open" />
            ) : (
              <IconExpandMore aria-label="Closed" />
            )}
          </button>
        }
        dropdownRef={dropdownEl}
        isActive={isDropdownOpen}>
        <Button
          type="button"
          onClick={() => {
            handleCreateCollection()
            setIsDropdownOpen(false)
          }}>
          Create new collection
        </Button>
        <Button
          type="button"
          onClick={() => {
            handleSelectCollection()
            setIsDropdownOpen(false)
          }}>
          Select collection from template
        </Button>
      </DropdownMenu>
    </div>
  )
}

export default AddWidget
