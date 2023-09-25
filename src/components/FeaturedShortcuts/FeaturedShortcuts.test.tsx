/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { ObjectId } from 'mongodb'
import '../../__mocks__/mockMatchMedia'
import { renderWithModalRoot } from '../../testHelpers'
import FeaturedShortcuts from './FeaturedShorcuts'
import { featuredShortcutItems } from './FeaturedShortcutItems'
import { Widget } from 'types/index'
import * as analyticsHooks from 'stores/analyticsContext'

const mockFeaturedShortcutsWidget: Widget = {
  _id: ObjectId(),
  title: 'Featured Shortcuts',
  type: 'FeaturedShortcuts',
}

describe('FeaturedShortcuts component', () => {
  test('renders the FeaturedShortcuts component', () => {
    render(
      <FeaturedShortcuts
        featuredShortcuts={featuredShortcutItems}
        widget={mockFeaturedShortcutsWidget}
      />
    )
    expect(screen.getByText('Featured Shortcuts')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'LeaveWeb (opens in a new window)' })
    ).toBeInTheDocument()
  })

  test('can remove the Featured shortcuts widget', async () => {
    const user = userEvent.setup()
    const mockUpdateModalId = jest.fn()
    const mockUpdateModalText = jest.fn()
    const mockUpdateWidget = jest.fn()

    renderWithModalRoot(
      <FeaturedShortcuts
        featuredShortcuts={featuredShortcutItems}
        widget={mockFeaturedShortcutsWidget}
      />,
      {
        updateModalId: mockUpdateModalId,
        updateModalText: mockUpdateModalText,
        updateWidget: mockUpdateWidget,
      }
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Featured Shortcuts Widget Settings',
      })
    )

    await user.click(
      await screen.findByRole('button', {
        name: 'Remove Featured Shortcuts widget',
      })
    )

    expect(mockUpdateModalId).toHaveBeenCalledWith(
      'removeFeaturedShortcutsWidgetModal'
    )
    expect(mockUpdateModalText).toHaveBeenCalledWith({
      headingText: 'Are you sure you’d like to delete this widget?',
      descriptionText:
        'You can re-add it to your My Space from the Add Widget menu.',
    })
    expect(mockUpdateWidget).toHaveBeenCalled()
  })

  test('calls trackEvent when a shortcut is clicked', async () => {
    const user = userEvent.setup()
    const mockTrackEvents = jest.fn()

    jest.spyOn(analyticsHooks, 'useAnalytics').mockImplementation(() => {
      return {
        push: jest.fn(),
        setUserIdFn: jest.fn(),
        unsetUserIdFn: jest.fn(),
        trackEvent: mockTrackEvents,
      }
    })

    render(
      <FeaturedShortcuts
        featuredShortcuts={featuredShortcutItems}
        widget={mockFeaturedShortcutsWidget}
      />
    )

    // Click the first featured shortcut - these values are currently static and
    // placed in the file FeaturedShortcutItems.ts
    const featuredShortcuts = screen.getAllByTestId('featured-shortcut-link')
    await user.click(featuredShortcuts[0])

    expect(mockTrackEvents).toHaveBeenCalledTimes(1)
    expect(mockTrackEvents).toHaveBeenCalledWith(
      'Featured Shortcuts',
      'Click on a featured shortcut',
      'Click icon',
      'Webmail'
    )
  })
})
