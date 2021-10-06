/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { createRef } from 'react'
import DropdownMenu from './DropdownMenu'

const menuItems = ['Item 1', 'Item 2', 'Item 3']
const mockOnClick = jest.fn()
const mockIcon = 'Toggle'
const mockAriaLabel = 'Test Aria Label'
describe('Dropdown Menu ', () => {
  beforeEach(() => {
    const mockRef = createRef<HTMLDivElement>()
    render(
      <DropdownMenu
        onMenuClick={mockOnClick}
        menuIcon={mockIcon}
        ariaLabel={mockAriaLabel}
        isActive={true}
        dropdownRef={mockRef}>
        {menuItems}
      </DropdownMenu>
    )
  })

  it('renders the children of the menu', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('renders the toggle button', () => {
    expect(screen.getByRole('button')).toHaveTextContent(mockIcon)
  })

  it('contains the correct aria label', () => {
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      mockAriaLabel
    )
  })

  it('fires the onClick function when toggle is clicked', () => {
    userEvent.click(screen.getByRole('button'))
    expect(mockOnClick).toHaveBeenCalled()
  })
})
