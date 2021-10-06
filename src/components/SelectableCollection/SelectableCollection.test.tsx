/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import React from 'react'

import SelectableCollection from './SelectableCollection'

describe('SelectableCollection component', () => {
  it('renders its children in a button', () => {
    const mockOnSelect = jest.fn()

    render(
      <SelectableCollection isSelected={false} onSelect={mockOnSelect}>
        Example Collection
      </SelectableCollection>
    )

    expect(screen.getByText('Example Collection')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Select collection' })
    ).toBeInTheDocument()
  })

  it('clicking the button calls the select handler', () => {
    const mockOnSelect = jest.fn()

    render(
      <SelectableCollection isSelected={false} onSelect={mockOnSelect}>
        Example Collection
      </SelectableCollection>
    )

    userEvent.click(screen.getByRole('button', { name: 'Select collection' }))
    expect(mockOnSelect).toBeCalled()
  })

  it('the select handler is keyboard accessible', () => {
    const mockOnSelect = jest.fn()

    render(
      <SelectableCollection isSelected={false} onSelect={mockOnSelect}>
        Example Collection
      </SelectableCollection>
    )

    userEvent.tab()
    expect(
      screen.getByRole('button', { name: 'Select collection' })
    ).toHaveFocus()
    userEvent.keyboard('{enter}')
    expect(mockOnSelect).toBeCalled()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <SelectableCollection isSelected={false} onSelect={jest.fn()}>
        Example Collection
      </SelectableCollection>
    )

    expect(await axe(container)).toHaveNoViolations()
  })

  describe('when selected', () => {
    it('renders an unselect button that appears on focus', () => {
      const mockOnSelect = jest.fn()

      render(
        <SelectableCollection isSelected={true} onSelect={mockOnSelect}>
          Example Collection
        </SelectableCollection>
      )

      userEvent.tab()
      expect(
        screen.getByRole('button', { name: 'Unselect collection' })
      ).toHaveFocus()
      userEvent.click(
        screen.getByRole('button', { name: 'Unselect collection' })
      )
      expect(mockOnSelect).toBeCalled()
    })

    it('has no a11y violations', async () => {
      const { container } = render(
        <SelectableCollection isSelected={true} onSelect={jest.fn()}>
          Example Collection
        </SelectableCollection>
      )

      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
