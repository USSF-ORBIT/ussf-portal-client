import React, { ReactNode, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './Section.module.scss'

import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import { useCloseWhenClickedOutside } from 'hooks/useCloseWhenClickedOutside'

const Section = ({
  header,
  children,
}: {
  header: ReactNode
  children: ReactNode | ReactNode[]
}) => {
  return (
    <div className={styles.section}>
      <div className={styles.header}>{header}</div>
      {children}
    </div>
  )
}

export default Section

export const SectionWithSettings = ({
  header,
  children,
  settingsItems,
  settingsMenuLabel = 'Section Settings',
}: {
  header: ReactNode
  children: ReactNode | ReactNode[]
  settingsItems: ReactNode[]
  settingsMenuLabel?: string
}) => {
  // Settings dropdown menu state
  const settingsDropdownEl = useRef<HTMLDivElement>(null)
  const [isSettingsOpen, setIsSettingsOpen] = useCloseWhenClickedOutside(
    settingsDropdownEl,
    false
  )

  // Toggle the dropdown menu
  const settingsMenuOnClick = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        {header}
        <DropdownMenu
          toggleEl={
            <button
              type="button"
              className={styles.dropdownMenuToggle}
              onClick={settingsMenuOnClick}
              aria-label={settingsMenuLabel}>
              <FontAwesomeIcon icon="cog" />
            </button>
          }
          dropdownRef={settingsDropdownEl}
          align="right"
          isActive={isSettingsOpen}>
          {settingsItems}
        </DropdownMenu>
      </div>
      {children}
    </div>
  )
}
