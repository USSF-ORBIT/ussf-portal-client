import React, { useRef } from 'react'
import { Button, Icon } from '@trussworks/react-uswds'
import { useFlags } from 'launchdarkly-react-client-sdk'
import styles from './AddWidget.module.scss'
import { useMySpaceContext } from 'stores/myspaceContext'

import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import { useCloseWhenClickedOutside } from 'hooks/useCloseWhenClickedOutside'

const AddWidget = ({
  handleSelectCollection,
}: {
  handleSelectCollection: () => void
}) => {
  const dropdownEl = useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useCloseWhenClickedOutside(
    dropdownEl,
    false
  )
  const flags = useFlags()

  const {
    canAddNews,
    canAddWeather,
    canAddCollections,
    canAddGuardianIdeal,
    canAddFeaturedShortcuts,
    addNewCollection,
    addNewsWidget,
    addGuardianIdeal,
    addFeaturedShortcuts,
    addNewWeatherWidget,
  } = useMySpaceContext()

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
          disabled={!canAddCollections}
          onClick={() => {
            addNewCollection()
            setIsDropdownOpen(false)
          }}>
          Create new collection
        </Button>
        <Button
          type="button"
          disabled={!canAddCollections}
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
            addNewsWidget()
            setIsDropdownOpen(false)
          }}>
          Add news widget
        </Button>
        <Button
          disabled={!canAddWeather}
          type="button"
          onClick={() => {
            addNewWeatherWidget('90210')
            setIsDropdownOpen(false)
          }}>
          Add weather widget
        </Button>
        {flags?.guardianIdealCarousel && (
          <Button
            disabled={!canAddGuardianIdeal}
            type="button"
            onClick={() => {
              addGuardianIdeal()
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
              addFeaturedShortcuts()
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
