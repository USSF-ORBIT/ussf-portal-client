import React from 'react'
import { NavDropDownButton, Label, Menu } from '@trussworks/react-uswds'
import styles from './DropdownFilter.module.scss'

type DropdownFilterProps = {
  handleClick: (isOpen: boolean) => void
  menuOptions: JSX.Element[]
  selectedOption: string
  isMenuOpen: boolean
  disabled: boolean
}

export const DropdownFilter = ({
  handleClick,
  menuOptions,
  selectedOption,
  isMenuOpen,
  disabled,
}: DropdownFilterProps) => {
  // We need to toggle the order based on what is currently selected
  const orderedOptions = [
    menuOptions.find(
      (menuOptions) => menuOptions.props.value === selectedOption
    ),
    ...menuOptions.filter(
      (menuOptions) => menuOptions.props.value !== selectedOption
    ),
  ]

  return (
    <div className={styles.dropdownFilter}>
      <Label className={styles.toolbarLabel} htmlFor="sortBy">
        View:
      </Label>
      {/* The first button in the array is the selected option and functions as the dropdown toggle */}
      <div className={styles.dropdownMenu}>
        <NavDropDownButton
          key={orderedOptions?.[0]?.key}
          label={orderedOptions?.[0]?.props.children}
          menuId="sortBy"
          isOpen={isMenuOpen}
          value={selectedOption}
          name={selectedOption}
          disabled={disabled}
          onToggle={() => handleClick(!isMenuOpen)}
        />

        <Menu
          type="subnav"
          items={orderedOptions.slice(1)}
          isOpen={isMenuOpen}
        />
      </div>
    </div>
  )
}
