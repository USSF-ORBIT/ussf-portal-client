/**
 * @jest-environment jsdom
 */

import { screen, act } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import { axe } from 'jest-axe'

import {
  renderWithAuthAndApollo,
  renderWithMySpaceAndModalContext,
} from '../../testHelpers'
import {
  testUser1,
  portalUserMaxedOutCollection,
} from '../../__fixtures__/authUsers'

import { cmsBookmarksMock as mockCmsBookmarks } from '../../__fixtures__/data/cmsBookmarks'
import { cmsAnnouncementsMock as mockCmsAnnouncements } from '../../__fixtures__/data/cmsAnnouncments'
import '../../__mocks__/mockMatchMedia'
import * as useUserHooks from 'hooks/useUser'
import Home, { getServerSideProps } from 'pages/index'
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
          bookmarks: mockCmsBookmarks,
          announcements: mockCmsAnnouncements,
        },
      }
    },
  },
}))

jest.mock('axios', () => ({
  post: () => {
    return Promise.resolve({ data: {} })
  },
}))

beforeEach(() => {
  jest
    .spyOn(useUserHooks, 'useUser')
    .mockImplementation((): MockedImplementation => {
      return {
        user: testUser1,
        portalUser: portalUserMaxedOutCollection as GetUserQuery,
        loading: false,
      }
    })
})

describe('Home page', () => {
  describe('without a user', () => {
    test('renders the loader while fetching the user', () => {
      jest
        .spyOn(useUserHooks, 'useUser')
        .mockImplementation((): MockedImplementation => {
          return {
            user: null,
            portalUser: undefined,
            loading: true,
          }
        })

      renderWithAuthAndApollo(
        <Home
          bookmarks={mockCmsBookmarks}
          announcements={mockCmsAnnouncements}
          pageTitle={'My Space'}
        />
      )
      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
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

    test('renders the home page', async () => {
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
    test('renders the correct props in getServerSideProps', async () => {
      const response = await getServerSideProps()

      expect(response).toEqual({
        props: {
          announcements: mockCmsAnnouncements,
          bookmarks: mockCmsBookmarks,
          pageTitle: 'My Space',
        },
      })
    })

    // Skipping due to the issue mentioned here: https://github.com/USSF-ORBIT/ussf-portal-client/pull/1222
    test.skip('has no a11y violations', async () => {
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
