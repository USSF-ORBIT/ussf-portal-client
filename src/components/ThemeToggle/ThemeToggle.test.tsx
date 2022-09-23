/**
 * @jest-environment jsdom
 */
import React from 'react'
import { waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'next-themes'
import * as analyticsHooks from 'stores/analyticsContext'
import { mockUseTheme, renderWithAuthAndApollo } from '../../testHelpers'
import { editThemeMock } from '../../__fixtures__/operations/editTheme'

import ThemeToggle from './ThemeToggle'

describe('ThemeToggle component', () => {
  it('renders the component', () => {
    renderWithAuthAndApollo(<ThemeToggle />, {}, editThemeMock)

    const toggleBtn = screen.getByTestId('theme-toggle')
    expect(toggleBtn).toBeVisible()

    userEvent.click(toggleBtn)
    expect(screen.getAllByText('light mode')).toHaveLength(1)
  })
})

describe('calling hook functions', () => {
  const mockTrackEvents = jest.fn()
  const { setItemMock, getItemMock } = mockUseTheme()

  beforeEach(() => {
    // mock out the return of useAnalytics since we just need to check that it's called not what it does
    jest.spyOn(analyticsHooks, 'useAnalytics').mockImplementation(() => {
      return { push: jest.fn(), trackEvent: mockTrackEvents }
    })

    // reset the mocks
    setItemMock.mockReset()
    getItemMock.mockReset()

    renderWithAuthAndApollo(
      <ThemeProvider enableSystem={false}>
        <ThemeToggle />
      </ThemeProvider>,
      {},
      editThemeMock
    )
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

  it('calls setTheme when the toggle is clicked', () => {
    const toggle = screen.getByTestId('theme-toggle')
    userEvent.click(toggle)
    expect(setItemMock).toHaveBeenCalledTimes(1)
    expect(setItemMock).toHaveBeenCalledWith('theme', 'dark')

    userEvent.click(toggle)
    expect(setItemMock).toHaveBeenCalledTimes(2)
    expect(setItemMock).toHaveBeenLastCalledWith('theme', 'light')
  })

  it('calls handleEditThemeMutation when the toggle is clicked', async () => {
    const toggle = screen.getByTestId('theme-toggle')
    userEvent.click(toggle)

    // only need to check that the function was called the expected number of times
    // the expected parameters are defined in the mock
    await waitFor(() =>
      expect(editThemeMock[0].newData).toHaveBeenCalledTimes(3)
    )
  })
})
