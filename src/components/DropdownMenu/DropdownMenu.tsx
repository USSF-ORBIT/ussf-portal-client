import React from 'react'
import styles from 'components/DropdownMenu/DropdownMenu.module.scss'

type PropTypes = {
  children: React.ReactNode
  menuIcon: React.ReactNode
  ariaLabel: string
  onMenuClick: () => void
  isActive: boolean
  dropdownRef: React.RefObject<HTMLDivElement>
}
const DropdownMenu = ({
  children,
  menuIcon,
  ariaLabel,
  onMenuClick,
  isActive,
  dropdownRef,
}: PropTypes) => {
  return (
    <div className="dropdown">
      <button
        type="button"
        className={styles.unstyled}
        onClick={onMenuClick}
        aria-label={ariaLabel}>
        {menuIcon}
      </button>

      {isActive && (
        <div className={styles.dropdownMenu} ref={dropdownRef}>
          <ol>
            {Array.isArray(children) ? (
              children.map((child, i) => <li key={`dropdown${i}`}>{child}</li>)
            ) : (
              <li key={`dropdown_0`}>{children}</li>
            )}
          </ol>
        </div>
      )}
    </div>
  )
}

export default DropdownMenu
