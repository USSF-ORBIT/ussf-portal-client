/**
 * @jest-environment jsdom
 */
import { screen, waitFor, act } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import { axe } from 'jest-axe'
import axios from 'axios'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next'

import { renderWithAuth } from '../../../testHelpers'
import { cmsPortalNewsArticlesMock as mockOrbitBlogArticles } from '../../../__fixtures__/data/cmsPortalNewsArticles'
import BreadcrumbNav from 'components/BreadcrumbNav/BreadcrumbNav'
import OrbitBlog, { getServerSideProps } from 'pages/about-us/orbit-blog'

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

describe('ORBIT Blog page', () => {
  const testContext = {
    query: {
      page: 1,
    },
  } as unknown as GetServerSidePropsContext

  it('returns correct page of articles based on query', async () => {
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

  it('returns not found if query is incorrect', async () => {
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
  it('returns 1 if no query or an invalid param', async () => {
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
    beforeEach(() => {
      renderWithAuth(<OrbitBlog articles={mockOrbitBlogArticles} />, {
        user: null,
      })
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
      html = renderWithAuth(
        <OrbitBlog
          articles={mockOrbitBlogArticles}
          currentPage={1}
          totalPages={1}
        />
      )
    })

    it('renders the page title and list of articles', async () => {
      expect(
        await screen.findByRole('heading', { level: 2 })
      ).toHaveTextContent('Production team blog & announcements')
      expect(await screen.findAllByRole('article')).toHaveLength(4)
    })

    it('has no a11y violations', async () => {
      // Bug with NextJS Link + axe :(
      // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
      await act(async () => {
        expect(await axe(html.container)).toHaveNoViolations()
      })
    })

    it('withLayout returns correct title and navigation', async () => {
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
