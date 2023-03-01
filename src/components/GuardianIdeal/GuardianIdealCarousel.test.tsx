/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { ObjectId } from 'mongodb'
import '../../__mocks__/mockMatchMedia'
import { mockFlags } from 'jest-launchdarkly-mock'
import { renderWithModalRoot } from '../../testHelpers'
import GuardianIdealCarousel from './GuardianIdealCarousel'
import { Widget } from 'types/index'
import { mockIdeals } from '__fixtures__/data/guardianIdeals'

const mockGuardianIdealWidget: Widget = {
  _id: ObjectId(),
  title: 'an IDEAL title',
  type: 'GuardianIdeal',
}

describe('GuardianIdealCarousel component', () => {
  test('renders the GuardianIdealCarousel component', () => {
    mockFlags({
      guardianIdealCarousel: true,
    })

    render(
      <GuardianIdealCarousel
        ideals={mockIdeals}
        widget={mockGuardianIdealWidget}
      />
    )

    const prevButton = screen.getByTestId('slick-prev')
    const nextButton = screen.getByTestId('slick-next')

    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()

    fireEvent.click(prevButton)
    fireEvent.click(nextButton)

    expect(
      screen.getByText('Connect in a Collaborative Environment')
    ).toBeInTheDocument()
  })

  test('can remove the GuardianIdealCarousel', async () => {
    const user = userEvent.setup()
    const mockUpdateModalId = jest.fn()
    const mockUpdateModalText = jest.fn()
    const mockUpdateWidget = jest.fn()

    mockFlags({
      guardianIdealCarousel: true,
    })

    renderWithModalRoot(
      <GuardianIdealCarousel
        ideals={mockIdeals}
        widget={mockGuardianIdealWidget}
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
        name: 'Remove Guardian Ideal section',
      })
    )

    expect(mockUpdateModalId).toHaveBeenCalledWith(
      'removeGuardianIdealSectionModal'
    )
    expect(mockUpdateModalText).toHaveBeenCalledWith({
      headingText: 'Are you sure you’d like to delete this section?',
      descriptionText:
        'You can re-add it to your My Space from the Add Section menu.',
    })
    expect(mockUpdateWidget).toHaveBeenCalled()
  })
})
