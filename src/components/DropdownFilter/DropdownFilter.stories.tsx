import React, { useState } from 'react'
import type { Meta } from '@storybook/react'
import styles from '../../styles/pages/sitesAndApplications.module.scss'
import { DropdownFilter } from './DropdownFilter'
export default {
  title: 'Base/DropdownFilter',
  component: DropdownFilter,
  decorators: [
    (Story) => (
      <div className={`${styles.toolbar} ${styles.toolbarLeft}`}>
        <Story />
      </div>
    ),
  ],
} as Meta

export const DefaultFilter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('option_1')

  const viewOptions = [
    <button
      key="option_1"
      value="option_1"
      type="button"
      onClick={() => {
        setSelectedOption('option_1')
        setIsOpen(false)
      }}>
      Option 1
    </button>,
    <button
      key="option_2"
      value="option_2"
      type="button"
      onClick={() => {
        setSelectedOption('option_2')
        setIsOpen(false)
      }}>
      Option 2
    </button>,
  ]

  return (
    <DropdownFilter
      handleClick={() => setIsOpen(!isOpen)}
      menuOptions={viewOptions}
      selectedOption={selectedOption}
      isMenuOpen={isOpen}
      disabled={false}
    />
  )
}
