/**
 * @jest-environment jsdom
 */
import { screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import { useRouter } from 'next/router'

import { renderWithAuth } from '../../testHelpers'

import { cmsOrbitBlogArticle } from '../../__fixtures__/data/cmsOrbitBlogArticle'
import { cmsInternalNewsArticle } from '../../__fixtures__/data/cmsInternalNewsArticle'

import SingleArticlePage from 'pages/articles/[article]'

jest.mock('../../lib/keystoneClient', () => ({
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

describe('Single article page', () => {
  describe('without a user', () => {
    beforeEach(() => {
      renderWithAuth(<SingleArticlePage article={cmsOrbitBlogArticle} />, {
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
    it('renders an ORBIT Blog article', async () => {
      renderWithAuth(<SingleArticlePage article={cmsOrbitBlogArticle} />)

      expect(
        await screen.findByRole('heading', { level: 1 })
      ).toHaveTextContent('ORBIT Blog')
      expect(
        await screen.findByRole('heading', { level: 2 })
      ).toHaveTextContent('Announcing the dev blog')

      expect(await screen.findAllByRole('article')).toHaveLength(1)
    })

    it('renders an Internal News article', async () => {
      renderWithAuth(<SingleArticlePage article={cmsInternalNewsArticle} />)

      expect(
        await screen.findByRole('heading', { level: 1 })
      ).toHaveTextContent('News')
      expect(
        await screen.findByRole('heading', { level: 2 })
      ).toHaveTextContent('USSF Internal News Article')

      expect(await screen.findAllByRole('article')).toHaveLength(1)
    })
  })
})
