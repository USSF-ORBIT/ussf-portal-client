/**
 * @jest-environment jsdom
 */
import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'next-themes'
import { mockUseTheme, renderWithAuthAndApollo } from '../../testHelpers'
import { editThemeMock } from '../../__fixtures__/operations/editTheme'

import ThemeToggle from './ThemeToggle'

import * as analyticsHooks from 'stores/analyticsContext'

describe('ThemeToggle component', () => {
  it('when off does not render the component', () => {
    renderWithAuthAndApollo(
      <ThemeToggle flags={{ darkModeToggle: false }} />,
      {},
      editThemeMock
    )

    expect(screen.queryByText('light mode')).toBeNull()
  })

  it('renders the component', () => {
    renderWithAuthAndApollo(
      <ThemeToggle flags={{ darkModeToggle: true }} />,
      {},
      editThemeMock
    )

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
        <ThemeToggle flags={{ darkModeToggle: true }} />
      </ThemeProvider>,
      {},
      editThemeMock
    )
  })

  it('calls trackEvent when the toggle is clicked', async () => {
    const toggle = screen.getByTestId('theme-toggle')
    await userEvent.click(toggle)

    expect(mockTrackEvents).toHaveBeenCalledTimes(1)
    expect(mockTrackEvents).toHaveBeenCalledWith(
      'Dark mode',
      'Click on light/dark mode toggle',
      'Light/Dark mode toggle'
    )
  })

  it('calls setTheme when the toggle is clicked', async () => {
    const toggle = screen.getByTestId('theme-toggle')
    await userEvent.click(toggle)
    expect(setItemMock).toHaveBeenCalledTimes(1)
    expect(setItemMock).toHaveBeenCalledWith('theme', 'dark')

    await userEvent.click(toggle)
    expect(setItemMock).toHaveBeenCalledTimes(2)
    expect(setItemMock).toHaveBeenLastCalledWith('theme', 'light')
  })

  it('calls handleEditThemeMutation when the toggle is clicked', async () => {
    const toggle = screen.getByTestId('theme-toggle')
    await userEvent.click(toggle)

    // only need to check that the function was called the expected number of times
    // the expected parameters are defined in the mock
    expect(editThemeMock[0].newData).toHaveBeenCalledTimes(3)
  })
})
