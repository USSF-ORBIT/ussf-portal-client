/**
 * @jest-environment jsdom
 */
import React from 'react'
import { waitFor, screen } from '@testing-library/react'
import { renderWithAuthAndApollo } from '../../testHelpers'
import { getUserMock } from '../../__fixtures__/operations/getUser'
import LandingPageLayout, { withLandingPageLayout } from './LandingPageLayout'

describe('LandingPageLayout', () => {
  test('renders the GovBanner component', async () => {
    renderWithAuthAndApollo(
      <LandingPageLayout>
        <div>Test content</div>
      </LandingPageLayout>,
      {},
      getUserMock
    )

    await waitFor(() =>
      expect(screen.getByTestId('govBanner')).toBeInTheDocument()
    )
  })

  test('renders the Header component', async () => {
    renderWithAuthAndApollo(
      <LandingPageLayout>
        <div>Test content</div>
      </LandingPageLayout>,
      {},
      getUserMock
    )

    await waitFor(() =>
      expect(screen.getByTestId('header')).toBeInTheDocument()
    )
  })

  test('renders the Footer component', async () => {
    renderWithAuthAndApollo(
      <LandingPageLayout>
        <div>Test content</div>
      </LandingPageLayout>,
      {},
      getUserMock
    )

    await waitFor(() => {
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
      expect(screen.getByText('Section508.gov')).toBeInTheDocument()
      expect(screen.getByText('Budget and Performance')).toBeInTheDocument()
    })
  })

  test('renders the children prop', async () => {
    renderWithAuthAndApollo(
      <LandingPageLayout>
        <div>Test content</div>
      </LandingPageLayout>,
      {},
      getUserMock
    )

    await waitFor(() =>
      expect(screen.getByText('Test content')).toBeInTheDocument()
    )
  })

  describe('withLandingPageLayout HOC', () => {
    test('renders children inside of the landing page layout', async () => {
      const TestPage = () => <div>My page</div>
      renderWithAuthAndApollo(
        withLandingPageLayout(<TestPage />),
        {},
        getUserMock
      )
      await waitFor(() =>
        expect(screen.getByText('My page')).toBeInTheDocument()
      )
    })
  })
})
