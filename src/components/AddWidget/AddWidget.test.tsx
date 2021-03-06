/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import userEvent from '@testing-library/user-event'
import React from 'react'

import AddWidget from './AddWidget'

describe('AddWidget component', () => {
  const testProps = {
    handleSelectCollection: jest.fn(),
    handleCreateCollection: jest.fn(),
    handleAddNews: jest.fn(),
  }

  it('renders an add widget menu', () => {
    render(<AddWidget {...testProps} />)

    const menuButton = screen.getByRole('button', { name: 'Add section' })
    expect(menuButton).toBeInTheDocument()
  })

  it('can toggle the menu', () => {
    render(
      <>
        <AddWidget {...testProps} />
        <button type="button">Another element</button>
      </>
    )

    expect(
      screen.queryByRole('button', { name: 'Select collection from template' })
    ).not.toBeInTheDocument()

    const menuButton = screen.getByRole('button', { name: 'Add section' })
    expect(menuButton).toBeInTheDocument()
    userEvent.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Select collection from template' })
    ).toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: 'Another element' }))
    expect(
      screen.queryByRole('button', { name: 'Select collection from template' })
    ).not.toBeInTheDocument()
  })

  it('handles the select collection button', () => {
    const mockHandleSelect = jest.fn()

    render(
      <AddWidget {...testProps} handleSelectCollection={mockHandleSelect} />
    )

    const menuButton = screen.getByRole('button', { name: 'Add section' })
    expect(menuButton).toBeInTheDocument()

    userEvent.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Select collection from template' })
    ).toBeInTheDocument()
    userEvent.click(
      screen.getByRole('button', { name: 'Select collection from template' })
    )

    expect(mockHandleSelect).toHaveBeenCalled()
    expect(
      screen.queryByRole('button', {
        name: 'Select collection from template',
      })
    ).not.toBeInTheDocument()
  })

  it('handles the create collection button', () => {
    const mockHandleCreate = jest.fn()

    render(
      <AddWidget {...testProps} handleCreateCollection={mockHandleCreate} />
    )

    const menuButton = screen.getByRole('button', { name: 'Add section' })
    expect(menuButton).toBeInTheDocument()

    userEvent.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Create new collection' })
    ).toBeInTheDocument()
    userEvent.click(
      screen.getByRole('button', { name: 'Create new collection' })
    )

    expect(mockHandleCreate).toHaveBeenCalled()
    expect(
      screen.queryByRole('button', { name: 'Create new collection' })
    ).not.toBeInTheDocument()
  })

  it('the add collection buttons are disabled if the user cannot add collections', () => {
    const mockHandleCreate = jest.fn()
    const mockHandleSelect = jest.fn()

    render(
      <AddWidget
        {...testProps}
        handleCreateCollection={mockHandleCreate}
        handleSelectCollection={mockHandleSelect}
        canAddCollection={false}
      />
    )

    const menuButton = screen.getByRole('button', { name: 'Add section' })
    expect(menuButton).toBeInTheDocument()

    userEvent.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Select collection from template' })
    ).toBeDisabled()
    expect(
      screen.getByRole('button', { name: 'Create new collection' })
    ).toBeDisabled()

    userEvent.click(
      screen.getByRole('button', { name: 'Select collection from template' })
    )
    expect(mockHandleSelect).not.toHaveBeenCalled()

    userEvent.click(
      screen.getByRole('button', {
        name: 'Create new collection',
      })
    )
    expect(mockHandleCreate).not.toHaveBeenCalled()
  })

  it('handles the Add news section button', () => {
    const mockAddNews = jest.fn()

    render(<AddWidget {...testProps} handleAddNews={mockAddNews} />)

    const menuButton = screen.getByRole('button', { name: 'Add section' })
    expect(menuButton).toBeInTheDocument()

    userEvent.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Add news section' })
    ).toBeInTheDocument()
    userEvent.click(screen.getByRole('button', { name: 'Add news section' }))

    expect(mockAddNews).toHaveBeenCalled()
    expect(
      screen.queryByRole('button', { name: 'Add news section' })
    ).not.toBeInTheDocument()
  })

  it('the Add news section button is disabled if the user cannot add News', () => {
    const mockAddNews = jest.fn()

    render(
      <AddWidget
        {...testProps}
        handleAddNews={mockAddNews}
        canAddNews={false}
      />
    )

    const menuButton = screen.getByRole('button', { name: 'Add section' })
    expect(menuButton).toBeInTheDocument()

    userEvent.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Add news section' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Add news section' })
    ).toBeDisabled()

    userEvent.click(screen.getByRole('button', { name: 'Add news section' }))
    expect(mockAddNews).not.toHaveBeenCalled()
  })

  it('has no a11y violations', async () => {
    const { container } = render(<AddWidget {...testProps} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
