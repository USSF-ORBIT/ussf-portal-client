import React, { ReactNode, useRef } from 'react'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './Widget.module.scss'

import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import { useCloseWhenClickedOutside } from 'hooks/useCloseWhenClickedOutside'

type WidgetProps = {
  header?: ReactNode
  children: ReactNode | ReactNode[]
  className?: string
}

const Widget = ({ header, children, className }: WidgetProps) => {
  return (
    <div className={classnames(styles.widget, className)}>
      <div className={styles.header}>
        <h3>{header}</h3>
      </div>
      {children}
    </div>
  )
}

export default Widget

export const WidgetWithSettings = ({
  header,
  settingsItems,
  settingsMenuLabel = `${header} Widget Settings`,
  ...props
}: {
  settingsItems: ReactNode[]
  settingsMenuLabel?: string
} & WidgetProps) => {
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
    <Widget
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
