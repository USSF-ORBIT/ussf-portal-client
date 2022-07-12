/**
 * @jest-environment jsdom
 */
import { screen, waitFor, act } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import { axe } from 'jest-axe'
import axios from 'axios'
import { useRouter } from 'next/router'

import { renderWithAuth } from '../../../testHelpers'

import { cmsPortalNewsArticlesMock } from '../../../__fixtures__/data/cmsPortalNewsArticles'
import { client } from '../../../lib/keystoneClient'
import OrbitBlog, { getServerSideProps } from 'pages/about-us/orbit-blog'
import { GetServerSidePropsContext } from 'next'

jest.mock('../../../lib/keystoneClient', () => ({
  client: {
    query: () => {
      return {
        data: {
          articles: cmsPortalNewsArticlesMock,
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
        articles: cmsPortalNewsArticlesMock,
        currentPage: 1,
        totalPages: 1,
      },
    })
  })
  describe('without a user', () => {
    beforeEach(() => {
      renderWithAuth(
        <OrbitBlog articles={cmsPortalNewsArticlesMock} currentPage={1} />,
        {
          user: null,
        }
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
      html = renderWithAuth(
        <OrbitBlog
          articles={cmsPortalNewsArticlesMock}
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
  })
})
