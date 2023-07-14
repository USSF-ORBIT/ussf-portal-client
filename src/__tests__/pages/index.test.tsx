/**
 * @jest-environment jsdom
 */

import { screen, waitFor, act } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { axe } from 'jest-axe'

import {
  renderWithAuth,
  renderWithMySpaceAndModalContext,
} from '../../testHelpers'
import { portalUserMaxedOutCollection } from '../../__fixtures__/authUsers'

import { cmsBookmarksMock as mockCmsBookmarks } from '../../__fixtures__/data/cmsBookmarks'
import { cmsAnnouncementsMock as mockCmsAnnouncements } from '../../__fixtures__/data/cmsAnnouncments'
import '../../__mocks__/mockMatchMedia'
import Home, { getServerSideProps } from 'pages/index'

jest.mock('../../lib/keystoneClient', () => ({
  client: {
    query: () => {
      return {
        data: {
          bookmarks: mockCmsBookmarks,
          announcements: mockCmsAnnouncements,
        },
      }
    },
  },
}))
jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

mockedAxios.get.mockImplementationOnce(() => {
  return Promise.reject()
})

const mockReplace = jest.fn()

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const mockedUseRouter = useRouter as jest.Mock

mockedUseRouter.mockReturnValue({
  route: '',
  pathname: '',
  query: '',
  asPath: '',
  push: jest.fn(),
  replace: mockReplace,
})

describe('Home page', () => {
  describe('without a user', () => {
    beforeEach(() => {
      renderWithAuth(
        <Home
          bookmarks={mockCmsBookmarks}
          announcements={mockCmsAnnouncements}
          pageTitle={'My Space'}
        />,
        { user: null }
      )
    })

    it('renders the loader while fetching the user', () => {
      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
    })

    it('redirects to the login page if not logged in', async () => {
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/login')
      })
    })
  })

  describe('when logged in', () => {
    let html: RenderResult

    beforeEach(() => {
      html = renderWithMySpaceAndModalContext(
        <Home
          bookmarks={mockCmsBookmarks}
          announcements={mockCmsAnnouncements}
          pageTitle={'My Space'}
        />,
        { mySpace: [...portalUserMaxedOutCollection.mySpace] }
      )
    })

    it('renders the home page', async () => {
      // Slider component in react-slick clones each item in the carousel,
      // so a length of 2 is accurate
      expect(screen.getAllByText('Test Announcement')).toHaveLength(2)

      expect(
        await screen.findByRole('heading', {
          level: 2,
          name: 'My Space',
        })
      ).toBeInTheDocument()

      expect(
        await screen.findByRole('heading', {
          level: 3,
          name: 'Example Collection',
        })
      ).toBeInTheDocument()

      expect(
        await screen.findByRole('heading', {
          level: 3,
          name: 'Maxed Out Collection',
        })
      ).toBeInTheDocument()

      expect(
        await screen.findByRole('heading', {
          level: 3,
          name: 'Recent News',
        })
      ).toBeInTheDocument()
    })
    it('renders the correct props in getServerSideProps', async () => {
      const response = await getServerSideProps()

      expect(response).toEqual({
        props: {
          announcements: mockCmsAnnouncements,
          bookmarks: mockCmsBookmarks,
          pageTitle: 'My Space',
        },
      })
    })

    it('has no a11y violations', async () => {
      // Bug with NextJS Link + axe :(
      // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
      await act(async () => {
        expect(
          await axe(html.container, {
            rules: {
              'heading-order': { enabled: false },
            },
          })
        ).toHaveNoViolations()
      })
    })
  })
})
