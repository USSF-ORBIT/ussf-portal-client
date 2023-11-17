/**
 * @jest-environment jsdom
 */
import { screen } from '@testing-library/react'
import type { GetServerSidePropsContext } from 'next'
import { renderWithAuth } from '../../../../testHelpers'
import { mockLandingPage } from '../../../../__fixtures__/data/landingPage'
import LandingPage, { getServerSideProps } from 'pages/landing/[landingPage]'
import * as useUserHooks from 'hooks/useUser'
import { testPortalUser1, testUser1 } from '__fixtures__/authUsers'
import { getSession } from 'lib/session'
import { SessionUser } from 'types'
import { GetUserQuery } from 'operations/portal/queries/getUser.g'

type MockedImplementation = {
  user: SessionUser | null
  portalUser: GetUserQuery | undefined
  loading: boolean
}

jest.mock('../../../../lib/keystoneClient', () => ({
  client: {
    query: jest.fn(() => {
      return {
        data: {
          landingPage: mockLandingPage,
        },
        loading: false,
        errors: [],
      }
    }),
  },
}))

jest.mock('lib/session', () => ({
  getSession: jest.fn(),
}))

const mockedGetSession = getSession as jest.Mock
mockedGetSession.mockImplementationOnce(() =>
  Promise.resolve({ passport: { user: testUser1 } })
)

describe('Landing Page', () => {
  const testContext = {
    query: {
      landingPage: 'test-landing-page',
    },
  } as unknown as GetServerSidePropsContext

  beforeEach(() => {
    jest
      .spyOn(useUserHooks, 'useUser')
      .mockImplementation((): MockedImplementation => {
        return {
          user: testUser1,
          portalUser: testPortalUser1 as GetUserQuery,
          loading: false,
        }
      })
  })

  // Mock IntersectionObserver for the InPageNavigation component from react-uswds
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    })
    window.IntersectionObserver = mockIntersectionObserver
  })

  test('getServerSideProps returns the landingPage prop', async () => {
    const response = await getServerSideProps(testContext)
    expect(response).toEqual({
      props: {
        landingPage: mockLandingPage,
      },
    })
  })

  test('render the landing page', async () => {
    renderWithAuth(
      <>
        <LandingPage landingPage={mockLandingPage} />
      </>
    )
    expect(screen.getByText('Test Landing Page')).toBeInTheDocument()
  })
})
