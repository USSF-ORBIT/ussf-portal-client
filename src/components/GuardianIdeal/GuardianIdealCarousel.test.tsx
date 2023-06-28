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
import * as analyticsHooks from 'stores/analyticsContext'

const mockGuardianIdealWidget: Widget = {
  _id: ObjectId(),
  title: 'an IDEAL title',
  type: 'GuardianIdeal',
}

describe('GuardianIdealCarousel component', () => {
  test('renders the GuardianIdealCarousel component', () => {
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
        name: 'Guardian Ideals Widget Settings',
      })
    )

    await user.click(
      await screen.findByRole('button', {
        name: 'Remove Guardian Ideal widget',
      })
    )

    expect(mockUpdateModalId).toHaveBeenCalledWith(
      'removeGuardianIdealWidgetModal'
    )
    expect(mockUpdateModalText).toHaveBeenCalledWith({
      headingText: 'Are you sure you’d like to delete this widget?',
      descriptionText:
        'You can re-add it to your My Space from the Add Widget menu.',
    })
    expect(mockUpdateWidget).toHaveBeenCalled()
  })

  test('calls trackEvent when next/previous is clicked', async () => {
    const user = userEvent.setup()
    const mockTrackEvents = jest.fn()

    jest.spyOn(analyticsHooks, 'useAnalytics').mockImplementation(() => {
      return { push: jest.fn(), trackEvent: mockTrackEvents }
    })

    mockFlags({
      guardianIdealCarousel: true,
    })

    render(
      <GuardianIdealCarousel
        ideals={mockIdeals}
        widget={mockGuardianIdealWidget}
      />
    )

    // Click previous
    const prev = screen.getByTestId('slick-prev')
    await user.click(prev)

    expect(mockTrackEvents).toHaveBeenCalledTimes(1)
    expect(mockTrackEvents).toHaveBeenCalledWith(
      'Guardian Ideal Carousel',
      'View next/previous',
      'Click next/previous'
    )

    // Click next
    const next = screen.getByTestId('slick-next')
    await user.click(next)

    expect(mockTrackEvents).toHaveBeenCalledTimes(2)
    expect(mockTrackEvents).toHaveBeenCalledWith(
      'Guardian Ideal Carousel',
      'View next/previous',
      'Click next/previous'
    )
  })
})
