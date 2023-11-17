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
        data: {
          landingPages: mockLandingPages,
        },
      }
    },
  },
}))

describe('Landing page index', () => {
  describe('when logged in', () => {
    test('returns correct props from getServerSideProps', async () => {
      const response = await getServerSideProps()

      expect(response).toEqual({
        props: {
          landingPages: [...mockLandingPages],
        },
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
