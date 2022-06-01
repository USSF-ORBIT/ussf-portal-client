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

import OrbitBlog from 'pages/about-us/orbit-blog'

jest.mock('../../../lib/keystoneClient', () => ({
  client: {
    query: () => {
      return
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
  describe('without a user', () => {
    beforeEach(() => {
      renderWithAuth(<OrbitBlog articles={cmsPortalNewsArticlesMock} />, {
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
      html = renderWithAuth(<OrbitBlog articles={cmsPortalNewsArticlesMock} />)
    })

    it('renders the page title and list of artiles', async () => {
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
