/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

import NewsSection from './NewsSection'

import mockRssFeed from '__mocks__/news-rss'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('News section component', () => {
  const mockHandleRemove = jest.fn()

  mockedAxios.get.mockImplementation(() => {
    return Promise.resolve({ data: mockRssFeed })
  })

  beforeEach(() => {
    mockedAxios.get.mockClear()
  })

  it('renders a section that displays RSS items and a link to the News page', async () => {
    render(<NewsSection onRemoveSection={mockHandleRemove} />)

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Recent News'
    )
    expect(await screen.findAllByRole('article')).toHaveLength(10)

    expect(screen.getByRole('link', { name: 'View all' })).toHaveAttribute(
      'href',
      '/news'
    )
  })

  it('renders a settings menu', async () => {
    render(<NewsSection onRemoveSection={mockHandleRemove} />)

    userEvent.click(
      screen.getByRole('button', {
        name: 'Section Settings',
      })
    )

    const removeButton = await screen.findByRole('button', {
      name: 'Remove this section',
    })

    expect(removeButton).toBeInTheDocument()

    userEvent.click(removeButton)
    expect(mockHandleRemove).toHaveBeenCalled()
  })
})
