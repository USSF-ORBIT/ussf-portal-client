/**
 * @jest-environment jsdom
 */
import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'

import DefaultLayout, { withDefaultLayout } from './DefaultLayout'

import { mockUseTheme, renderWithAuthAndApollo } from '../../testHelpers'
import { getDisplayNameMock } from '__fixtures__/operations/getDisplayName'
import { getThemeMock } from '../../__fixtures__/operations/getTheme'
import { editThemeMock } from '../../__fixtures__/operations/editTheme'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '',
    pathname: '',
    query: '',
    asPath: '',
  }),
}))

describe('DefaultLayout component', () => {
  beforeEach(async () => {
    renderWithAuthAndApollo(
      <DefaultLayout>
        <h1>Test Page</h1>
      </DefaultLayout>,
      {},
      [...getDisplayNameMock, ...getThemeMock]
    )
    // need to wait for the query to finish so waiting for banner to display
    await waitFor(() =>
      expect(screen.getByTestId('govBanner')).toBeInTheDocument()
    )
  })

  it('renders its children', async () => {
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders personal data', () => {
    expect(screen.getByTestId('personal-data').textContent).toContain(
      'Welcome, BERNADETT'
    )
  })

  it('renders a skip nav link', () => {
    expect(
      screen.getByRole('link', { name: 'Skip to main content' })
    ).toHaveAttribute('href', '#main-content')

    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
  })

  it('renders a feedback link', () => {
    expect(
      screen.getByRole('link', { name: 'Send us feedback' })
    ).toHaveAttribute(
      'href',
      'mailto:feedback@ussforbit.us?subject=USSF portal feedback'
    )
  })

  it('renders common layout elements', () => {
    expect(screen.getAllByRole('banner')).toHaveLength(2) // Gov banner & site header
    expect(screen.getAllByRole('navigation')).toHaveLength(4) // header, page nav, footer
  })
})

describe('calls hooks as needed', () => {
  const { setItemMock } = mockUseTheme()

  beforeEach(async () => {
    renderWithAuthAndApollo(
      <ThemeProvider enableSystem={false}>
        <DefaultLayout>
          <h1>Test Page</h1>
        </DefaultLayout>
      </ThemeProvider>,
      {},
      [...getThemeMock, ...editThemeMock]
    )
    // need to wait for the query to finish so waiting for banner to display
    await waitFor(() =>
      expect(screen.getByTestId('govBanner')).toBeInTheDocument()
    )
  })

  it('uses useGetThemeQuery', () => {
    expect(getThemeMock[0].result).toHaveBeenCalled()
  })

  it('uses setTheme', async () => {
    await waitFor(() => expect(setItemMock).toHaveBeenCalled())
  })
})

describe('DefaultLayout component before theme query is finished', () => {
  beforeEach(async () => {
    renderWithAuthAndApollo(
      <DefaultLayout>
        <h1>Test Page</h1>
      </DefaultLayout>
    )
  })
  it('does not show anything', () => {
    expect(screen.queryByText('Test Page')).not.toBeInTheDocument()
  })
})

describe('withDefaultLayout HOC', () => {
  it('renders children inside of the default layout', async () => {
    const TestPage = () => <div>My page</div>
    renderWithAuthAndApollo(withDefaultLayout(<TestPage />), {}, getThemeMock)
    await waitFor(() => {
      expect(screen.getByText('My page')).toBeInTheDocument()
    })
  })
})
