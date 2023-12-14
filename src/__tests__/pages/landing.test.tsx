/**
 * @jest-environment jsdom
 */
import { screen } from '@testing-library/react'
import { GetServerSidePropsContext } from 'next'
import { renderWithAuth } from '../../testHelpers'
import { getSession } from 'lib/session'
import Landing, { getServerSideProps } from 'pages/landing'
import { mockLandingPages } from '__fixtures__/data/landingPages'
import { cmsUser, testUser1 } from '__fixtures__/authUsers'
import { PublishableItemType } from 'types'
import { isPublished } from 'helpers/index'

jest.mock('../../lib/keystoneClient', () => ({
  client: {
    query: () => {
      return {
        data: { landingPages: mockLandingPages },
      }
    },
  },
}))

type LandingPage = {
  pageTitle: string
  slug: string
} & PublishableItemType

const testContext = {} as unknown as GetServerSidePropsContext

jest.mock('lib/session', () => ({
  getSession: jest.fn(),
}))

const mockedGetSession = getSession as jest.Mock

describe('Landing page index', () => {
  describe('when logged in', () => {
    describe('geServerSideProps', () => {
      test('returns only published sorted landing pages for non-cms user', async () => {
        mockedGetSession.mockImplementationOnce(() =>
          Promise.resolve({ passport: { user: testUser1 } })
        )
        const response = await getServerSideProps(testContext)
        const expectedSortedPages = mockLandingPages
          .filter(isPublished)
          .sort((a: LandingPage, b: LandingPage) =>
            a.pageTitle.localeCompare(b.pageTitle)
          )

        expect(response).toEqual({
          props: {
            landingPages: expectedSortedPages,
            showStatus: false,
          },
        })
      })

      test('returns all sorted landing pages for cms user', async () => {
        mockedGetSession.mockImplementationOnce(() =>
          Promise.resolve({ passport: { user: cmsUser } })
        )
        const response = await getServerSideProps(testContext)
        const expectedSortedPages = mockLandingPages.sort(
          (a: LandingPage, b: LandingPage) =>
            a.pageTitle.localeCompare(b.pageTitle)
        )

        expect(response).toEqual({
          props: {
            landingPages: expectedSortedPages,
            showStatus: true,
          },
        })
      })
    })

    test('renders the index page', async () => {
      renderWithAuth(<Landing landingPages={mockLandingPages} />, {
        user: testUser1,
      })

      expect(screen.getByText('Landing Pages')).toBeInTheDocument()
      expect(screen.getByText('Test Landing Page')).toBeInTheDocument()
    })

    test('withDefaultLayout renders page', async () => {
      const result = Landing.getLayout(
        <Landing landingPages={mockLandingPages} />
      )

      expect(result.props.children).toEqual(
        <Landing landingPages={mockLandingPages} />
      )
    })
  })
})
