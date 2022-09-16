/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeToggle from './ThemeToggle'
import * as analyticsHooks from 'stores/analyticsContext'

describe('ThemeToggle component', () => {
  it('renders the component', () => {
    render(<ThemeToggle />)

    const toggleBtn = screen.getByTestId('theme-toggle')
    expect(toggleBtn).toBeVisible()

    userEvent.click(toggleBtn)
    expect(screen.getAllByText('light mode')).toHaveLength(1)
  })
})

describe('calling trackEvent function', () => {
  const mockTrackEvents = jest.fn()

  beforeEach(() => {
    // mock out the return of useAnalytics since we just need to check that it's called not what it does
    jest.spyOn(analyticsHooks, 'useAnalytics').mockImplementation(() => {
      return { push: jest.fn(), trackEvent: mockTrackEvents }
    })

    render(<ThemeToggle />)
  })

  it('calls trackEvent when the toggle is clicked', () => {
    const toggle = screen.getByTestId('theme-toggle')
    userEvent.click(toggle)

    expect(mockTrackEvents).toHaveBeenCalledTimes(1)
    expect(mockTrackEvents).toHaveBeenCalledWith(
      'Dark mode',
      'Click on light/dark mode toggle',
      'Light/Dark mode toggle'
    )
  })
})
