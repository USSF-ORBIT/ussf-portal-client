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
            aria-label="Add widget">
            <span className={styles.plus}>
              <Icon.Add role="presentation" />
            </span>
            <br />
            Add widget{' '}
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
          Add news widget
        </Button>
        {flags?.guardianIdealCarousel && (
          <Button
            disabled={!canAddGuardianIdeal}
            type="button"
            onClick={() => {
              handleAddGuardianIdeal()
              setIsDropdownOpen(false)
            }}>
            Add Guardian Ideal widget
          </Button>
        )}
        {flags?.featuredShortcuts && (
          <Button
            disabled={!canAddFeaturedShortcuts}
            type="button"
            onClick={() => {
              handleAddFeaturedShortcuts()
              setIsDropdownOpen(false)
            }}>
            Add Featured Shortcuts widget
          </Button>
        )}
      </DropdownMenu>
    </div>
  )
}

export default AddWidget
