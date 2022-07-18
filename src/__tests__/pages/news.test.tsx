/**
 * @jest-environment jsdom
 */
import { screen, waitFor } from '@testing-library/react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { renderWithAuth } from '../../testHelpers'

import mockRssFeed from '__mocks__/news-rss'
import News from 'pages/news'

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

describe('News page', () => {
  describe('without a user', () => {
    beforeEach(() => {
      jest.useFakeTimers()

      mockedAxios.get.mockImplementationOnce(() => {
        return Promise.reject()
      })

      renderWithAuth(<News />, { user: null })
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

  describe('when logged in', () => {
    beforeEach(() => {
      mockedAxios.get.mockClear()
    })

    it('renders the page title and RSS items', async () => {
      mockedAxios.get.mockImplementation(() => {
        return Promise.resolve({ data: mockRssFeed })
      })

      renderWithAuth(<News />)

      expect(
        await screen.findByRole('heading', { level: 2 })
      ).toHaveTextContent('All USSF news')
      expect(await screen.findAllByRole('article')).toHaveLength(10)
    })
  })
})
