/**
 * @jest-environment jsdom
 */
import { screen } from '@testing-library/react'
import { renderWithAuth } from '../../testHelpers'
import Landing, { getServerSideProps } from 'pages/landing'
import { mockLandingPages } from '__fixtures__/data/landingPages'
import { testUser1 } from '__fixtures__/authUsers'

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
}

describe('Landing page index', () => {
  describe('when logged in', () => {
    describe('geServerSideProps', () => {
      test('returns published pages only', async () => {
        const response = await getServerSideProps()
        const published = mockLandingPages
          .filter((lp) => lp.status === 'Published')
          .sort((a: LandingPage, b: LandingPage) =>
            a.pageTitle.localeCompare(b.pageTitle)
          )

        expect(response).toEqual({
          props: {
            landingPages: published,
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
