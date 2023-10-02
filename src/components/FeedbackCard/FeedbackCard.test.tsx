/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react'

import React from 'react'

import FeedbackCard from './FeedbackCard'

// importing these to spyOn the useAnalytics call
import * as analyticsHooks from 'stores/analyticsContext'

describe('Feedback Card component', () => {
  it('renders a feedback card', () => {
    render(<FeedbackCard />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'Got feedback?' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'feedback@ussforbit.us' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Send us feedback' })
    ).toBeInTheDocument()
  })

  describe('trackEvent functions called', () => {
    const mockTrackEvents = jest.fn()

    beforeEach(() => {
      // need to clear the mock since the var mockTrackEvents carries over both calls
      mockTrackEvents.mockClear()

      // mock out the return of useAnalytics since we just need to check that it's called not what it does
      jest.spyOn(analyticsHooks, 'useAnalytics').mockImplementation(() => {
        return {
          push: jest.fn(),
          setUserIdFn: jest.fn(),
          unsetUserIdFn: jest.fn(),
          trackEvent: mockTrackEvents,
          trackBaseLocation: jest.fn(),
        }
      })

      render(<FeedbackCard />)
    })

    it("calls trackEvent when clicking 'Send us feedback' link", () => {
      const link = screen.getByRole('link', { name: 'Send us feedback' })

      fireEvent.click(link)

      expect(mockTrackEvents).toHaveBeenCalledTimes(1)
      expect(mockTrackEvents).toHaveBeenCalledWith(
        'Feedback',
        'Send us feedback'
      )
    })

    it("calls trackEvent when clicking 'feedback@ussforbit.us' link", () => {
      const link = screen.getByRole('link', { name: 'feedback@ussforbit.us' })

      fireEvent.click(link)

      expect(mockTrackEvents).toHaveBeenCalledTimes(1)
      expect(mockTrackEvents).toHaveBeenCalledWith(
        'Feedback',
        'feedback@ussforbit.us'
      )
    })
  })
})
