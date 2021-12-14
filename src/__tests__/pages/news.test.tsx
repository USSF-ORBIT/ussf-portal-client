/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import { useRouter } from 'next/router'

import { renderWithAuth } from '../../testHelpers'

import mockRssFeed from '__mocks__/news-rss'
import News, { NewsArticle } from 'pages/news'

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

// Mock fetch
window.fetch = jest.fn(() =>
  Promise.resolve({
    text: async () => mockRssFeed,
  })
) as jest.Mock

const mockedFetch = fetch as jest.Mock

describe('NewsArticle component', () => {
  it('renders the article contents', () => {
    const testArticle = {
      desc: 'In explaining the basis for choosing Jones, the White House highlighted that she was commissioned through the Air Force ROTC program while a student at Boston University and “has spent her career working to protect U.S. economic and national security.”',
      date: 'JUL 23, 2021',
      link: 'https://www.spaceforce.mil/News/Article/2705653/senate-confirms-gina-ortiz-jones-to-be-air-force-under-secretary/',
      title: 'Senate confirms Gina Ortiz Jones to be Air Force Under Secretary',
    }

    render(<NewsArticle {...testArticle} />)

    expect(screen.getByText(/JUL 23, 2021/)).toBeInTheDocument()
    expect(screen.getByRole('heading')).toHaveTextContent(
      'Senate confirms Gina Ortiz Jones to be Air Force Under Secretary'
    )
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://www.spaceforce.mil/News/Article/2705653/senate-confirms-gina-ortiz-jones-to-be-air-force-under-secretary/'
    )
    expect(
      screen.getByText(
        'In explaining the basis for choosing Jones, the White House highlighted that she was commissioned through the Air Force ROTC program while a student at Boston University and “has spent her career working to protect U.S. economic and national security.”'
      )
    ).toBeInTheDocument()
  })

  describe('with an empty article', () => {
    it('renders an empty article', () => {
      const testArticle = {}

      render(<NewsArticle {...testArticle} />)

      expect(screen.getByRole('article')).toBeInTheDocument()
    })
  })
})

describe('News page', () => {
  describe('without a user', () => {
    beforeEach(() => {
      renderWithAuth(<News />, { user: null })
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
    beforeEach(() => {
      mockedFetch.mockClear()
    })

    it('renders the page title and RSS contents', async () => {
      renderWithAuth(<News />)

      expect(
        await screen.findByRole('heading', { level: 1 })
      ).toHaveTextContent('What’s New')

      expect(await screen.findAllByRole('article')).toHaveLength(10)
    })

    describe('with an empty item', () => {
      it('renders without breaking', async () => {
        mockedFetch.mockResolvedValueOnce({
          text: async () =>
            `<?xml version="1.0" encoding="utf-8"?>\r\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cf="http://www.microsoft.com/schemas/rss/core/2005">\r\n <channel>
    \r\n <title>United States Space Force News</title>\r\n
    <link>https://www.spaceforce.mil</link>\r\n <description>United States Space Force News RSS Feed</description>\r\n
    <language>en-us</language>\r\n <pubDate>Fri, 23 Jul 2021 15:29:00 GMT</pubDate>\r\n <lastBuildDate>Mon, 26 Jul 2021
      14:05:50 GMT</lastBuildDate>\r\n
    <atom:link
      href="http://www.spaceforce.mil/DesktopModules/ArticleCS/RSS.ashx?ContentType=1&amp;Site=1060&amp;max=10?ContentType=1&amp;Site=1060&amp;isdashboardselected=0&amp;max=10"
      rel="self" type="application/rss+xml" />\r\n <item>\r\n <link></link>\r\n<description>This is an empty article</description>\r\n<pubDate></pubDate>\r\n<title></title>\r\n
      \r\n <dc:creator>DoD News</dc:creator>\r\n <guid isPermaLink="false">
        https://www.spaceforce.mil/News/Article/2705653/senate-confirms-gina-ortiz-jones-to-be-air-force-under-secretary/
      </guid>\r\n
      <enclosure url="https://media.defense.gov/2021/May/19/2002809800/670/394/0/210519-F-GO452-0001.JPG"
        type="image/jpeg" />\r\n
    </item>\r\n 
  </channel>\r\n</rss>
`,
        })

        renderWithAuth(<News />)

        expect(await screen.findAllByRole('article')).toHaveLength(1)
        expect(
          await screen.findByText(/This is an empty article/)
        ).toBeInTheDocument()
      })
    })

    describe('if the RSS fetch fails', () => {
      it('logs the error', async () => {
        const consoleSpy = jest.spyOn(console, 'error')

        mockedFetch.mockRejectedValueOnce(new Error('Error fetching RSS'))

        renderWithAuth(<News />)

        waitFor(() =>
          expect(consoleSpy).toHaveBeenCalledWith('Error displaying RSS feed')
        )
      })
    })
  })
})
