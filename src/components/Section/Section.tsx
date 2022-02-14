import React, { ReactNode, useRef } from 'react'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './Section.module.scss'

import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import { useCloseWhenClickedOutside } from 'hooks/useCloseWhenClickedOutside'

type SectionProps = {
  header: ReactNode
  children: ReactNode | ReactNode[]
  className?: string
}

const Section = ({ header, children, className }: SectionProps) => {
  return (
    <div className={classnames(styles.section, className)}>
      <div className={styles.header}>{header}</div>
      {children}
    </div>
  )
}

export default Section

export const SectionWithSettings = ({
  header,
  settingsItems,
  settingsMenuLabel = 'Section Settings',
  ...props
}: {
  settingsItems: ReactNode[]
  settingsMenuLabel?: string
} & SectionProps) => {
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
    <Section
      header={
        <>
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
        </>
      }
      {...props}
    />
  )
}
