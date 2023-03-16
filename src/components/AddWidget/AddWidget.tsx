import React, { useRef } from 'react'
import { Button, Icon } from '@trussworks/react-uswds'
import { useFlags } from 'launchdarkly-react-client-sdk'

import styles from './AddWidget.module.scss'

import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import { useCloseWhenClickedOutside } from 'hooks/useCloseWhenClickedOutside'

const AddWidget = ({
  handleSelectCollection,
  handleCreateCollection,
  handleAddNews,
  handleAddGuardianIdeal,
  handleAddFeaturedShortcuts,
  canAddNews = true,
  canAddCollection = true,
  canAddGuardianIdeal = true,
  canAddFeaturedShortcuts = true,
}: {
  handleSelectCollection: () => void
  handleCreateCollection: () => void
  handleAddNews: () => void
  handleAddGuardianIdeal: () => void
  handleAddFeaturedShortcuts: () => void
  canAddNews?: boolean
  canAddCollection?: boolean
  canAddGuardianIdeal?: boolean
  canAddFeaturedShortcuts?: boolean
}) => {
  const dropdownEl = useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useCloseWhenClickedOutside(
    dropdownEl,
    false
  )
  const flags = useFlags()

  const menuOnClick = () => {
    setIsDropdownOpen((state) => !state)
  }

  return (
    <div className={styles.addWidget}>
      <DropdownMenu
        align="center"
        toggleEl={
          <button
            className={styles.addWidgetButton}
            type="button"
            id="addNewWidget"
            onClick={menuOnClick}
            aria-label="Add section">
            <span className={styles.plus}>
              <Icon.Add role="presentation" />
            </span>
            <br />
            Add section{' '}
            {isDropdownOpen ? (
              <Icon.ExpandLess aria-label="Open" />
            ) : (
              <Icon.ExpandMore aria-label="Closed" />
            )}
          </button>
        }
        dropdownRef={dropdownEl}
        isActive={isDropdownOpen}>
        <Button
          type="button"
          disabled={!canAddCollection}
          onClick={() => {
            handleCreateCollection()
            setIsDropdownOpen(false)
          }}>
          Create new collection
        </Button>
        <Button
          type="button"
          disabled={!canAddCollection}
          onClick={() => {
            handleSelectCollection()
            setIsDropdownOpen(false)
          }}>
          Select collection from template
        </Button>
        <Button
          disabled={!canAddNews}
          type="button"
          onClick={() => {
            handleAddNews()
            setIsDropdownOpen(false)
          }}>
          Add news section
        </Button>
        {flags && flags?.guardianIdealCarousel && (
          <Button
            disabled={!canAddGuardianIdeal}
            type="button"
            onClick={() => {
              handleAddGuardianIdeal()
              setIsDropdownOpen(false)
            }}>
            Add Guardian Ideal section
          </Button>
        )}
        <Button
          disabled={!canAddFeaturedShortcuts}
          type="button"
          onClick={() => {
            handleAddFeaturedShortcuts()
            setIsDropdownOpen(false)
          }}>
          Add Featured Shortcuts section
        </Button>
      </DropdownMenu>
    </div>
  )
}

export default AddWidget
