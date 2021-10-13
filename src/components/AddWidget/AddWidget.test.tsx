/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import AddWidget from './AddWidget'

describe('AddWidget component', () => {
  it('renders an add widget menu', () => {
    const mockHandleSelect = jest.fn()

    render(<AddWidget handleSelectCollection={mockHandleSelect} />)

    const menuButton = screen.getByRole('button', { name: 'Add section' })
    expect(menuButton).toBeInTheDocument()
  })

  it('can toggle the menu', () => {
    const mockHandleSelect = jest.fn()

    render(
      <>
        <AddWidget handleSelectCollection={mockHandleSelect} />
        <button type="button">Another element</button>
      </>
    )

    expect(
      screen.queryByRole('button', { name: 'Select existing collection(s)' })
    ).not.toBeInTheDocument()

    const menuButton = screen.getByRole('button', { name: 'Add section' })
    expect(menuButton).toBeInTheDocument()
    userEvent.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Select existing collection(s)' })
    ).toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: 'Another element' }))
    expect(
      screen.queryByRole('button', { name: 'Select existing collection(s)' })
    ).not.toBeInTheDocument()
  })

  it('handles the select collection button', () => {
    const mockHandleSelect = jest.fn()

    render(<AddWidget handleSelectCollection={mockHandleSelect} />)

    const menuButton = screen.getByRole('button', { name: 'Add section' })
    expect(menuButton).toBeInTheDocument()

    userEvent.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Select existing collection(s)' })
    ).toBeInTheDocument()
    userEvent.click(
      screen.getByRole('button', { name: 'Select existing collection(s)' })
    )

    expect(mockHandleSelect).toHaveBeenCalled()
  })
})
