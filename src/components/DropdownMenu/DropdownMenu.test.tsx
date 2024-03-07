/**
 * @jest-environment jsdom
 */

import { render, screen, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { createRef } from 'react'
import { axe } from 'jest-axe'
import DropdownMenu from './DropdownMenu'

describe('Dropdown Menu ', () => {
  const menuItems = ['Item 1', 'Item 2', 'Item 3']
  const mockOnClick = jest.fn()

  let html: RenderResult

  beforeEach(() => {
    const mockRef = createRef<HTMLDivElement>()

    const toggleEl = (
      <button type="button" onClick={mockOnClick} aria-label="Test Aria Label">
        Toggle Dropdown
      </button>
    )

    html = render(
      <DropdownMenu toggleEl={toggleEl} isActive={true} dropdownRef={mockRef}>
        {menuItems}
      </DropdownMenu>
    )
  })

  test('renders the children of the menu', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  test('renders the toggle button', async () => {
    const user = userEvent.setup()
    expect(screen.getByRole('button')).toHaveTextContent('Toggle Dropdown')
    await user.click(screen.getByRole('button'))
    expect(mockOnClick).toHaveBeenCalled()
  })

  test('has no a11y violations', async () => {
    expect(await axe(html.container)).toHaveNoViolations()
  })
})
