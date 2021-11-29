import React from 'react'
import classnames from 'classnames'
import styles from 'components/DropdownMenu/DropdownMenu.module.scss'

type DropdownMenuAlignment = 'left' | 'right' | 'center'

type PropTypes = {
  toggleEl: React.ReactNode
  children: React.ReactNode
  isActive: boolean
  align?: DropdownMenuAlignment
  dropdownRef?: React.RefObject<HTMLDivElement>
}

const DropdownMenu = ({
  children,
  isActive,
  align,
  dropdownRef,
  toggleEl,
}: PropTypes) => {
  const menuClasses = classnames(styles.dropdownMenu, {
    [styles.left]: align === 'left',
    [styles.right]: align === 'right',
    [styles.center]: align === 'center',
  })

  return (
    // Ref needs to encompass the menu trigger in order
    // to properly track inside/outside click for open/close
    <div ref={dropdownRef} className={styles.dropdown}>
      {toggleEl}

      {isActive && (
        <div className={menuClasses}>
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
