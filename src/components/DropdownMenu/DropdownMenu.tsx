import React from 'react'
import styles from 'components/DropdownMenu/DropdownMenu.module.scss'

// TODO - clean up prop types for triggerEl

type PropTypes = {
  children: React.ReactNode
  menuIcon?: React.ReactNode
  ariaLabel?: string
  onMenuClick?: () => void
  isActive: boolean
  dropdownRef?: React.RefObject<HTMLDivElement>
  triggerEl?: React.ReactNode
}
const DropdownMenu = ({
  children,
  menuIcon,
  ariaLabel,
  onMenuClick,
  isActive,
  dropdownRef,
  triggerEl,
}: PropTypes) => {
  return (
    // Ref needs to encompass the menu trigger in order
    // to properly track inside/outside click for open/close
    <div ref={dropdownRef} className={styles.dropdown}>
      {triggerEl ? (
        triggerEl
      ) : (
        <button
          type="button"
          className={styles.dropdownMenuToggle}
          onClick={onMenuClick}
          aria-label={ariaLabel}>
          {menuIcon}
        </button>
      )}

      {isActive && (
        <div className={styles.dropdownMenu}>
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
