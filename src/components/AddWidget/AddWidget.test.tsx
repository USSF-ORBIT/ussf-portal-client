/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { mockFlags } from 'jest-launchdarkly-mock'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { renderWithMySpaceAndModalContext } from '../../testHelpers'
import AddWidget from './AddWidget'

describe('AddWidget component', () => {
  const testProps = {
    handleSelectCollection: jest.fn(),
  }

  test('renders an add widget menu', () => {
    render(<AddWidget {...testProps} />)

    const menuButton = screen.getByRole('button', { name: 'Add widget' })
    expect(menuButton).toBeInTheDocument()
  })

  test('can toggle the menu', async () => {
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

  test('Select collection button', async () => {
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

  test('Create collection button', async () => {
    const user = userEvent.setup()
    const mockHandleCreate = jest.fn()

    renderWithMySpaceAndModalContext(<AddWidget {...testProps} />, {
      addNewCollection: mockHandleCreate,
    })

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

  test('Add collection buttons are disabled if the user cannot add collections', async () => {
    const user = userEvent.setup()
    const mockHandleCreate = jest.fn()
    const mockHandleSelect = jest.fn()

    renderWithMySpaceAndModalContext(
      <AddWidget {...testProps} handleSelectCollection={mockHandleSelect} />,
      { canAddCollections: false, addNewCollection: mockHandleCreate }
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

  test('Add news widget button', async () => {
    const user = userEvent.setup()
    const mockAddNews = jest.fn()

    renderWithMySpaceAndModalContext(<AddWidget {...testProps} />, {
      addNewsWidget: mockAddNews,
    })

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

  test('Add news widget button is disabled if the user cannot add News', async () => {
    const user = userEvent.setup()
    const mockAddNews = jest.fn()

    renderWithMySpaceAndModalContext(<AddWidget {...testProps} />, {
      canAddNews: false,
      addNewsWidget: mockAddNews,
    })

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

  test('Add weather widget', async () => {
    mockFlags({
      weatherWidget: true,
    })

    const user = userEvent.setup()
    const mockSetTemporaryWidget = jest.fn()
    const mockIsAddingWidget = jest.fn()

    renderWithMySpaceAndModalContext(<AddWidget {...testProps} />, {
      setTemporaryWidget: mockSetTemporaryWidget,
      setIsAddingWidget: mockIsAddingWidget,
    })

    const menuButton = screen.getByRole('button', { name: 'Add widget' })
    expect(menuButton).toBeInTheDocument()

    await user.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Add weather widget' })
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Add weather widget' }))

    expect(mockSetTemporaryWidget).toHaveBeenCalledWith('Weather')
    expect(mockIsAddingWidget).toHaveBeenCalledWith(true)

    expect(
      screen.queryByRole('button', { name: 'Add weather widget' })
    ).not.toBeInTheDocument()
  })

  test('Add weather widget button is disabled if the user cannot add Weather', async () => {
    mockFlags({
      weatherWidget: true,
    })

    const user = userEvent.setup()
    const mockSetTemporaryWidget = jest.fn()
    const mockIsAddingWidget = jest.fn()

    renderWithMySpaceAndModalContext(<AddWidget {...testProps} />, {
      canAddWeather: false,
      setTemporaryWidget: mockSetTemporaryWidget,
      setIsAddingWidget: mockIsAddingWidget,
    })

    const menuButton = screen.getByRole('button', { name: 'Add widget' })
    expect(menuButton).toBeInTheDocument()

    await user.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Add weather widget' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Add weather widget' })
    ).toBeDisabled()

    await user.click(screen.getByRole('button', { name: 'Add weather widget' }))

    expect(mockSetTemporaryWidget).not.toHaveBeenCalled()
    expect(mockIsAddingWidget).not.toHaveBeenCalled()
  })

  test('Add Guardian Ideal widget button', async () => {
    const user = userEvent.setup()
    const mockAddGuardianIdeal = jest.fn()

    mockFlags({
      guardianIdealCarousel: true,
    })

    renderWithMySpaceAndModalContext(<AddWidget {...testProps} />, {
      addGuardianIdeal: mockAddGuardianIdeal,
    })

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

  test('Add Guardian Ideal widget button is disabled if the user cannot add it', async () => {
    const user = userEvent.setup()
    const mockAddGuardianIdeal = jest.fn()

    renderWithMySpaceAndModalContext(<AddWidget {...testProps} />, {
      canAddGuardianIdeal: false,
      addGuardianIdeal: mockAddGuardianIdeal,
    })

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

  test('Add Featured Shortcuts widget button', async () => {
    const user = userEvent.setup()
    const mockAddFeaturedShortcuts = jest.fn()

    mockFlags({
      featuredShortcuts: true,
    })

    renderWithMySpaceAndModalContext(<AddWidget {...testProps} />, {
      addFeaturedShortcuts: mockAddFeaturedShortcuts,
    })

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

  test('Add Featured Shortcuts widget button is disabled if the user cannot add it', async () => {
    const user = userEvent.setup()
    const mockAddFeaturedShortcuts = jest.fn()
    mockFlags({
      featuredShortcuts: true,
    })

    renderWithMySpaceAndModalContext(<AddWidget {...testProps} />, {
      canAddFeaturedShortcuts: false,
      addFeaturedShortcuts: mockAddFeaturedShortcuts,
    })

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

  test('has no a11y violations', async () => {
    const { container } = render(<AddWidget {...testProps} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
