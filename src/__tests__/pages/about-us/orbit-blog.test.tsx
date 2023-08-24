/**
 * @jest-environment jsdom
 */
import { screen, act } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import { axe } from 'jest-axe'
import { GetServerSidePropsContext } from 'next'

import { renderWithAuth } from '../../../testHelpers'
import { cmsPortalNewsArticlesMock as mockOrbitBlogArticles } from '../../../__fixtures__/data/cmsPortalNewsArticles'
import BreadcrumbNav from 'components/BreadcrumbNav/BreadcrumbNav'
import OrbitBlog, { getServerSideProps } from 'pages/about-us/orbit-blog'
import * as useUserHooks from 'hooks/useUser'
import { testPortalUser1, testUser1 } from '__fixtures__/authUsers'

jest.mock('../../../lib/keystoneClient', () => ({
  client: {
    query: () => {
      return {
        data: {
          articles: mockOrbitBlogArticles,
        },
        loading: false,
        errors: [],
      }
    },
  },
}))

beforeEach(() => {
  jest.spyOn(useUserHooks, 'useUser').mockImplementation(() => {
    return {
      user: testUser1,
      portalUser: testPortalUser1,
      loading: false
    }
  })
})

describe('ORBIT Blog page', () => {
  const testContext = {
    query: {
      page: 1,
    },
  } as unknown as GetServerSidePropsContext

  test('returns correct page of articles based on query', async () => {
    const response = await getServerSideProps(testContext)

    expect(response).toEqual({
      props: {
        articles: mockOrbitBlogArticles,
        currentPage: 1,
        totalPages: 1,
        pageTitle: 'Orbit Blog',
      },
    })
  })

  test('returns not found if query is incorrect', async () => {
    const errorContext = {
      query: {
        page: 100,
      },
    } as unknown as GetServerSidePropsContext
    const response = await getServerSideProps(errorContext)
    expect(response).toEqual({
      notFound: true,
    })
  })
  test('returns 1 if no query or an invalid param', async () => {
    const defaultContext = {
      query: {
        page: 'invalid',
      },
    } as unknown as GetServerSidePropsContext
    const response = await getServerSideProps(defaultContext)

    expect(response).toEqual({
      props: {
        articles: mockOrbitBlogArticles,
        currentPage: 1,
        totalPages: 1,
        pageTitle: 'Orbit Blog',
      },
    })
  })

  describe('without a user', () => {
    test('renders the loader while fetching the user', () => {
      jest.spyOn(useUserHooks, 'useUser').mockImplementation(() => {
        return {
          user: null,
          portalUser:  null,
          loading: true
        }
      })

      renderWithAuth(<OrbitBlog articles={mockOrbitBlogArticles} />, {})

      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
    })
  })

  describe('when logged in', () => {
    let html: RenderResult

    beforeEach(() => {
      html = renderWithAuth(
        <OrbitBlog
          articles={mockOrbitBlogArticles}
          currentPage={1}
          totalPages={1}
        />
      )
    })

    test('renders the page title and list of articles', async () => {
      expect(
        await screen.findByRole('heading', { level: 2 })
      ).toHaveTextContent('Production team blog & announcements')
      expect(await screen.findAllByRole('article')).toHaveLength(4)
    })

    test('has no a11y violations', async () => {
      // Bug with NextJS Link + axe :(
      // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
      await act(async () => {
        expect(await axe(html.container)).toHaveNoViolations()
      })
    })

    test('withLayout returns correct title and navigation', async () => {
      const result = OrbitBlog.getLayout('page')

      // this array is inexplicably throwing a lint error for missing keys
      // even though the data matches what we pass in to withLayout()
      expect(result.props.header.props.children).toEqual([
        // eslint-disable-next-line react/jsx-key
        <h1>ORBIT Blog</h1>,

        // eslint-disable-next-line react/jsx-key
        <BreadcrumbNav
          navItems={[
            { label: 'Service portal home', path: '/' },
            { label: 'About Us', path: '/about-us' },
            { current: true, label: 'ORBIT Blog', path: '/orbit-blog' },
          ]}
        />,
      ])
    })
  })
})
