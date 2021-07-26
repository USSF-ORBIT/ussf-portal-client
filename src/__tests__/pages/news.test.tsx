/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'

import mockRssFeed from '__mocks__/news-rss'
import News from 'pages/news'

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    text: async () => mockRssFeed,
  })
) as jest.Mock

describe('News page', () => {
  it('renders the page title and RSS contents', async () => {
    render(<News />)

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(
      'What’s New'
    )

    expect(await screen.findAllByRole('article')).toHaveLength(10)
  })
})
