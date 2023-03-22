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
    expect(screen.getByRole('link', { name: 'LeaveWeb' })).toBeInTheDocument()
  })

  test('can remove the Featured shortcuts Section', async () => {
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
        name: 'Section Settings',
      })
    )

    await user.click(
      await screen.findByRole('button', {
        name: 'Remove Featured Shortcuts section',
      })
    )

    expect(mockUpdateModalId).toHaveBeenCalledWith(
      'removeFeaturedShortcutsSectionModal'
    )
    expect(mockUpdateModalText).toHaveBeenCalledWith({
      headingText: 'Are you sure you’d like to delete this section?',
      descriptionText:
        'You can re-add it to your My Space from the Add Section menu.',
    })
    expect(mockUpdateWidget).toHaveBeenCalled()
  })
})
