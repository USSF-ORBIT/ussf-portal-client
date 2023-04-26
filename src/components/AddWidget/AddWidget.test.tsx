/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { mockFlags } from 'jest-launchdarkly-mock'
import userEvent from '@testing-library/user-event'
import React from 'react'

import AddWidget from './AddWidget'

describe('AddWidget component', () => {
  const testProps = {
    handleSelectCollection: jest.fn(),
    handleCreateCollection: jest.fn(),
    handleAddNews: jest.fn(),
    handleAddGuardianIdeal: jest.fn(),
    handleAddFeaturedShortcuts: jest.fn(),
  }

  it('renders an add widget menu', () => {
    render(<AddWidget {...testProps} />)

    const menuButton = screen.getByRole('button', { name: 'Add widget' })
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

    const menuButton = screen.getByRole('button', { name: 'Add widget' })
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

    const menuButton = screen.getByRole('button', { name: 'Add widget' })
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

    const menuButton = screen.getByRole('button', { name: 'Add widget' })
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

    const menuButton = screen.getByRole('button', { name: 'Add widget' })
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

  it('handles the Add news widget button', async () => {
    const user = userEvent.setup()
    const mockAddNews = jest.fn()

    render(<AddWidget {...testProps} handleAddNews={mockAddNews} />)

    const menuButton = screen.getByRole('button', { name: 'Add widget' })
    expect(menuButton).toBeInTheDocument()

    await user.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Add news widget' })
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Add news widget' }))

    expect(mockAddNews).toHaveBeenCalled()
    expect(
      screen.queryByRole('button', { name: 'Add news widget' })
    ).not.toBeInTheDocument()
  })

  it('the Add news widget button is disabled if the user cannot add News', async () => {
    const user = userEvent.setup()
    const mockAddNews = jest.fn()

    render(
      <AddWidget
        {...testProps}
        handleAddNews={mockAddNews}
        canAddNews={false}
      />
    )

    const menuButton = screen.getByRole('button', { name: 'Add widget' })
    expect(menuButton).toBeInTheDocument()

    await user.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Add news widget' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Add news widget' })
    ).toBeDisabled()

    await user.click(screen.getByRole('button', { name: 'Add news widget' }))
    expect(mockAddNews).not.toHaveBeenCalled()
  })

  test('handles Add Guardian Ideal widget button', async () => {
    const user = userEvent.setup()
    const mockAddGuardianIdeal = jest.fn()

    mockFlags({
      guardianIdealCarousel: true,
    })

    render(
      <AddWidget {...testProps} handleAddGuardianIdeal={mockAddGuardianIdeal} />
    )

    const menuButton = screen.getByRole('button', { name: 'Add widget' })
    expect(menuButton).toBeInTheDocument()

    await user.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Add Guardian Ideal widget' })
    ).toBeInTheDocument()
    await user.click(
      screen.getByRole('button', { name: 'Add Guardian Ideal widget' })
    )

    expect(mockAddGuardianIdeal).toHaveBeenCalled()
    expect(
      screen.queryByRole('button', { name: 'Add Guardian Ideal widget' })
    ).not.toBeInTheDocument()
  })

  test('the Add Guardian Ideal widget button is disabled if the user cannot add it', async () => {
    const user = userEvent.setup()
    const mockAddGuardianIdeal = jest.fn()

    render(
      <AddWidget
        {...testProps}
        handleAddNews={mockAddGuardianIdeal}
        canAddGuardianIdeal={false}
      />
    )

    const menuButton = screen.getByRole('button', { name: 'Add widget' })
    expect(menuButton).toBeInTheDocument()

    await user.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Add Guardian Ideal widget' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Add Guardian Ideal widget' })
    ).toBeDisabled()

    await user.click(
      screen.getByRole('button', { name: 'Add Guardian Ideal widget' })
    )
    expect(mockAddGuardianIdeal).not.toHaveBeenCalled()
  })

  test('handles Add Featured Shortcuts widget button', async () => {
    const user = userEvent.setup()
    const mockAddFeaturedShortcuts = jest.fn()

    mockFlags({
      featuredShortcuts: true,
    })

    render(
      <AddWidget
        {...testProps}
        handleAddFeaturedShortcuts={mockAddFeaturedShortcuts}
      />
    )

    const menuButton = screen.getByRole('button', { name: 'Add widget' })
    expect(menuButton).toBeInTheDocument()

    await user.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Add Featured Shortcuts widget' })
    ).toBeInTheDocument()
    await user.click(
      screen.getByRole('button', { name: 'Add Featured Shortcuts widget' })
    )

    expect(mockAddFeaturedShortcuts).toHaveBeenCalled()
    expect(
      screen.queryByRole('button', { name: 'Add Featured Shortcuts widget' })
    ).not.toBeInTheDocument()
  })

  test('the Add Featured Shortcuts widget button is disabled if the user cannot add it', async () => {
    const user = userEvent.setup()
    const mockAddFeaturedShortcuts = jest.fn()
    mockFlags({
      featuredShortcuts: true,
    })

    render(
      <AddWidget
        {...testProps}
        handleAddFeaturedShortcuts={mockAddFeaturedShortcuts}
        canAddFeaturedShortcuts={false}
      />
    )

    const menuButton = screen.getByRole('button', { name: 'Add widget' })
    expect(menuButton).toBeInTheDocument()

    await user.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Add Featured Shortcuts widget' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Add Featured Shortcuts widget' })
    ).toBeDisabled()

    await user.click(
      screen.getByRole('button', { name: 'Add Featured Shortcuts widget' })
    )
    expect(mockAddFeaturedShortcuts).not.toHaveBeenCalled()
  })

  it('has no a11y violations', async () => {
    const { container } = render(<AddWidget {...testProps} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
