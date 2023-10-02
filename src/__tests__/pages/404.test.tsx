/**
 * @jest-environment jsdom
 */
import { screen, waitFor } from '@testing-library/react'
import { renderWithAuth } from '../../testHelpers'
import * as analyticsHooks from 'stores/analyticsContext'
import * as useUserHooks from 'hooks/useUser'
import { testPortalUser1, testUser1 } from '__fixtures__/authUsers'
import Custom404 from 'pages/404'
import { SessionUser } from 'types'
import { GetUserQuery } from 'operations/portal/queries/getUser.g'

type MockedImplementation = {
  user: SessionUser | null
  portalUser: GetUserQuery | undefined
  loading: boolean
}

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

describe('404 page', () => {
  describe('without a user', () => {
    beforeEach(() => {
      jest
        .spyOn(useUserHooks, 'useUser')
        .mockImplementation((): MockedImplementation => {
          return {
            user: null,
            portalUser: undefined,
            loading: true,
          }
        })
      renderWithAuth(<Custom404 />, {})
    })

    test('renders the loader while fetching the user', () => {
      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
    })
  })

  describe('when logged in', () => {
    beforeEach(() => {
      renderWithAuth(<Custom404 />)
    })

    test('renders the custom 404 page,', () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404')
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        'Looks like you’re a little lost'
      )
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'That page doesn’t exist (or never did). Let’s get you back where you belong, or send us a dispatch to notify us of an error in the system.'
      )
    })

    test('renders a go home button', () => {
      expect(
        screen.getByRole('link', { name: 'Take me home' })
      ).toHaveAttribute('href', '/')
    })

    test('renders feedback links', async () => {
      const feedbackLink = screen.getByText('Contact Us')
      expect(feedbackLink).toBeVisible()
      expect(feedbackLink).toHaveAttribute('href')
      expect(feedbackLink.getAttribute('href')).toContain(
        'feedback@ussforbit.us'
      )
      expect(feedbackLink.getAttribute('href')).toContain(
        'USSF portal feedback -- 404 page error'
      )
    })

    test('calls trackEvent with the correct arguments', async () => {
      const mockTrackEvents = jest.fn()
      jest.spyOn(analyticsHooks, 'useAnalytics').mockImplementation(() => {
        return {
          push: jest.fn(),
          setUserIdFn: jest.fn(),
          unsetUserIdFn: jest.fn(),
          trackEvent: mockTrackEvents,
          trackBaseLocation: jest.fn(),
          trackRank: jest.fn(),
        }
      })
      renderWithAuth(<Custom404 />)
      await waitFor(() => {
        expect(mockTrackEvents).toHaveBeenCalledWith(
          'Error page',
          'Page missing',
          '404',
          window.location.pathname
        )
      })
    })
  })
})
