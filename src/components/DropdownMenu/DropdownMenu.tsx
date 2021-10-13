import React from 'react'
import styles from 'components/DropdownMenu/DropdownMenu.module.scss'

type PropTypes = {
  toggleEl: React.ReactNode
  children: React.ReactNode
  isActive: boolean
  dropdownRef?: React.RefObject<HTMLDivElement>
}
const DropdownMenu = ({
  children,
  isActive,
  dropdownRef,
  toggleEl,
}: PropTypes) => {
  return (
    // Ref needs to encompass the menu trigger in order
    // to properly track inside/outside click for open/close
    <div ref={dropdownRef} className={styles.dropdown}>
      {toggleEl}

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
