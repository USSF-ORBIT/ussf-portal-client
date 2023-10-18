/**
 * @jest-environment jsdom
 */
import { screen } from '@testing-library/react'

import { renderWithAuth } from '../../testHelpers'

import { cmsAnnouncementsMock as mockAnnouncements } from '../../__fixtures__/data/cmsAnnouncments'
import '../../__mocks__/mockMatchMedia'
import AnnouncementsPage, { getServerSideProps } from 'pages/announcements'
import * as useUserHooks from 'hooks/useUser'
import { testPortalUser1, testUser1 } from '__fixtures__/authUsers'
import { SessionUser } from 'types'
import { GetUserQuery } from 'operations/portal/queries/getUser.g'

type MockedImplementation = {
  user: SessionUser | null
  portalUser: GetUserQuery | undefined
  loading: boolean
}

jest.mock('../../lib/keystoneClient', () => ({
  client: {
    query: () => {
      return {
        data: {
          announcements: mockAnnouncements,
        },
      }
    },
  },
}))

describe('Announcements page', () => {
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

      renderWithAuth(
        <AnnouncementsPage
          announcements={mockAnnouncements}
          pageTitle={'Latest Announcements'}
        />,
        {}
      )
    })

    test('renders the loader while fetching the user and does not fetch RSS items', () => {
      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
    })
  })

  describe('when loggined in', () => {
    test('returns correct props from getServerSideProps', async () => {
      const response = await getServerSideProps()

      expect(response).toEqual({
        props: {
          announcements: mockAnnouncements,
          pageTitle: 'Latest Announcements',
        },
      })
    })

    test('renders the latest announcements', async () => {
      renderWithAuth(
        <AnnouncementsPage
          announcements={mockAnnouncements}
          pageTitle={'Latest Announcements'}
        />
      )

      mockAnnouncements.map((announcement) => {
        expect(screen.getByText(announcement.title)).toBeInTheDocument()
      })
    })

    test('renders the title passed to withLayout', async () => {
      const result = AnnouncementsPage.getLayout('page')
      expect(result.props.header.props.children[0]).toEqual(
        <h1>Latest Announcements</h1>
      )
    })
  })
})
