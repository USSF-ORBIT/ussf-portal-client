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
    handleAddGuardianIdeal: jest.fn(),
  }

  it('renders an add widget menu', () => {
    render(<AddWidget {...testProps} />)

    const menuButton = screen.getByRole('button', { name: 'Add section' })
    expect(menuButton).toBeInTheDocument()
  })

  it('can toggle the menu', async () => {
    const user = userEvent.setup()
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
    await user.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Select collection from template' })
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Another element' }))
    expect(
      screen.queryByRole('button', { name: 'Select collection from template' })
    ).not.toBeInTheDocument()
  })

  it('handles the select collection button', async () => {
    const user = userEvent.setup()
    const mockHandleSelect = jest.fn()

    render(
      <AddWidget {...testProps} handleSelectCollection={mockHandleSelect} />
    )

    const menuButton = screen.getByRole('button', { name: 'Add section' })
    expect(menuButton).toBeInTheDocument()

    await user.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Select collection from template' })
    ).toBeInTheDocument()
    await user.click(
      screen.getByRole('button', { name: 'Select collection from template' })
    )

    expect(mockHandleSelect).toHaveBeenCalled()
    expect(
      screen.queryByRole('button', {
        name: 'Select collection from template',
      })
    ).not.toBeInTheDocument()
  })

  it('handles the create collection button', async () => {
    const user = userEvent.setup()
    const mockHandleCreate = jest.fn()

    render(
      <AddWidget {...testProps} handleCreateCollection={mockHandleCreate} />
    )

    const menuButton = screen.getByRole('button', { name: 'Add section' })
    expect(menuButton).toBeInTheDocument()

    await user.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Create new collection' })
    ).toBeInTheDocument()
    await user.click(
      screen.getByRole('button', { name: 'Create new collection' })
    )

    expect(mockHandleCreate).toHaveBeenCalled()
    expect(
      screen.queryByRole('button', { name: 'Create new collection' })
    ).not.toBeInTheDocument()
  })

  it('the add collection buttons are disabled if the user cannot add collections', async () => {
    const user = userEvent.setup()
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

    await user.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Select collection from template' })
    ).toBeDisabled()
    expect(
      screen.getByRole('button', { name: 'Create new collection' })
    ).toBeDisabled()

    await user.click(
      screen.getByRole('button', { name: 'Select collection from template' })
    )
    expect(mockHandleSelect).not.toHaveBeenCalled()

    await user.click(
      screen.getByRole('button', {
        name: 'Create new collection',
      })
    )
    expect(mockHandleCreate).not.toHaveBeenCalled()
  })

  it('handles the Add news section button', async () => {
    const user = userEvent.setup()
    const mockAddNews = jest.fn()

    render(<AddWidget {...testProps} handleAddNews={mockAddNews} />)

    const menuButton = screen.getByRole('button', { name: 'Add section' })
    expect(menuButton).toBeInTheDocument()

    await user.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Add news section' })
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Add news section' }))

    expect(mockAddNews).toHaveBeenCalled()
    expect(
      screen.queryByRole('button', { name: 'Add news section' })
    ).not.toBeInTheDocument()
  })

  it('the Add news section button is disabled if the user cannot add News', async () => {
    const user = userEvent.setup()
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

    await user.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Add news section' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Add news section' })
    ).toBeDisabled()

    await user.click(screen.getByRole('button', { name: 'Add news section' }))
    expect(mockAddNews).not.toHaveBeenCalled()
  })

  test('handles Add Guardian Ideal section button', async () => {
    const user = userEvent.setup()
    const mockAddGuardianIdeal = jest.fn()

    render(
      <AddWidget {...testProps} handleAddGuardianIdeal={mockAddGuardianIdeal} />
    )

    const menuButton = screen.getByRole('button', { name: 'Add section' })
    expect(menuButton).toBeInTheDocument()

    await user.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Add Guardian Ideal section' })
    ).toBeInTheDocument()
    await user.click(
      screen.getByRole('button', { name: 'Add Guardian Ideal section' })
    )

    expect(mockAddGuardianIdeal).toHaveBeenCalled()
    expect(
      screen.queryByRole('button', { name: 'Add Guardian Ideal section' })
    ).not.toBeInTheDocument()
  })

  test('the Add Guardian Ideal section button is disabled if the user cannot add it', async () => {
    const user = userEvent.setup()
    const mockAddGuardianIdeal = jest.fn()

    render(
      <AddWidget
        {...testProps}
        handleAddNews={mockAddGuardianIdeal}
        canAddGuardianIdeal={false}
      />
    )

    const menuButton = screen.getByRole('button', { name: 'Add section' })
    expect(menuButton).toBeInTheDocument()

    await user.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Add Guardian Ideal section' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Add Guardian Ideal section' })
    ).toBeDisabled()

    await user.click(
      screen.getByRole('button', { name: 'Add Guardian Ideal section' })
    )
    expect(mockAddGuardianIdeal).not.toHaveBeenCalled()
  })

  it('has no a11y violations', async () => {
    const { container } = render(<AddWidget {...testProps} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
