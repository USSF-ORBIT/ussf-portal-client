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

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '',
    pathname: '',
    query: '',
    asPath: '',
    replace: jest.fn(),
  }),
}))

describe('ThemeToggle component', () => {
  test('renders nothing if no user', async () => {
    renderWithAuthAndApollo(<ThemeToggle />, { user: null })

    expect(screen.queryByTestId('theme-toggle')).toBeNull()
  })

  test('renders the component', () => {
    const user = userEvent.setup()

    renderWithAuthAndApollo(<ThemeToggle />, {}, editThemeMock)

    const toggleBtn = screen.getByTestId('theme-toggle')
    expect(toggleBtn).toBeVisible()

    user.click(toggleBtn)
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

  test('calls trackEvent when the toggle is clicked', async () => {
    const user = userEvent.setup()
    const toggle = screen.getByTestId('theme-toggle')
    await user.click(toggle)

    expect(mockTrackEvents).toHaveBeenCalledTimes(1)
    expect(mockTrackEvents).toHaveBeenCalledWith(
      'Dark mode',
      'Click on light/dark mode toggle',
      'Light/Dark mode toggle'
    )
  })

  test('calls setTheme when the toggle is clicked', async () => {
    const user = userEvent.setup()
    const toggle = screen.getByTestId('theme-toggle')
    await user.click(toggle)
    expect(setItemMock).toHaveBeenCalledTimes(1)
    expect(setItemMock).toHaveBeenCalledWith('theme', 'dark')

    await user.click(toggle)
    expect(setItemMock).toHaveBeenCalledTimes(2)
    expect(setItemMock).toHaveBeenLastCalledWith('theme', 'light')
  })

  test('calls handleEditThemeMutation when the toggle is clicked', async () => {
    const user = userEvent.setup()
    const toggle = screen.getByTestId('theme-toggle')
    await user.click(toggle)

    // only need to check that the function was called the expected number of times
    // the expected parameters are defined in the mock
    expect(editThemeMock[0].newData).toHaveBeenCalledTimes(3)
  })
})
