/**
 * @jest-environment jsdom
 */

import { render, screen, RenderResult, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { createRef } from 'react'
import { axe } from 'jest-axe'
import DropdownMenu from './DropdownMenu'

describe('Dropdown Menu ', () => {
  const menuItems = ['Item 1', 'Item 2', 'Item 3']
  const mockOnClick = jest.fn()
  const mockIcon = 'Toggle'
  const mockAriaLabel = 'Test Aria Label'
  let html: RenderResult
  beforeEach(() => {
    const mockRef = createRef<HTMLDivElement>()
    html = render(
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

  it('has no a11y violations', async () => {
    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      expect(await axe(html.container)).toHaveNoViolations()
    })
  })
})
