/**
 * @jest-environment jsdom
 */
import { screen, waitFor } from '@testing-library/react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { renderWithAuth } from '../../testHelpers'

import { cmsAnnouncementsMock as mockAnnouncements } from '../../__fixtures__/data/cmsAnnouncments'
import '../../__mocks__/mockMatchMedia'
import AnnouncementsPage, { getServerSideProps } from 'pages/announcements'

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
jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const mockPush = jest.fn()
const mockReplace = jest.fn()

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '',
    pathname: '',
    query: '',
    asPath: '',
    push: jest.fn(),
    replace: jest.fn(),
  }),
}))

const mockedUseRouter = useRouter as jest.Mock

mockedUseRouter.mockReturnValue({
  route: '',
  pathname: '',
  query: '',
  asPath: '',
  push: mockPush,
  replace: mockReplace,
})

describe('Announcements page', () => {
  describe('without a user', () => {
    beforeEach(() => {
      jest.useFakeTimers()

      mockedAxios.get.mockImplementationOnce(() => {
        return Promise.reject()
      })

      renderWithAuth(
        <AnnouncementsPage
          announcements={mockAnnouncements}
          pageTitle={'Latest Announcements'}
        />,
        {
          user: null,
        }
      )
    })

    it('renders the loader while fetching the user and does not fetch RSS items', () => {
      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    })

    it('redirects to the login page if not logged in', async () => {
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/login')
      })
    })
  })

  describe('when loggined in', () => {
    beforeEach(() => {
      mockedAxios.get.mockClear()
    })

    it('returns correct props from getServerSideProps', async () => {
      const response = await getServerSideProps()

      expect(response).toEqual({
        props: {
          announcements: mockAnnouncements,
          pageTitle: 'Latest Announcements',
        },
      })
    })

    it('renders the latest announcements', async () => {
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

    it('renders the title passed to withLayout', async () => {
      const result = AnnouncementsPage.getLayout('page')
      expect(result.props.header.props.children[0]).toEqual(
        <h1>Latest Announcements</h1>
      )
    })
  })
})
