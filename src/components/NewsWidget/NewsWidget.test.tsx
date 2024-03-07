/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { ObjectId } from 'mongodb'

import { renderWithModalRoot } from '../../testHelpers'
import NewsWidget from './NewsWidget'
import { Widget } from 'types/index'

import { mockRssFeedTen } from '__mocks__/news-rss'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const mockNewsWidget: Widget = {
  _id: ObjectId(),
  title: 'Recent News',
  type: 'News',
}

describe('NewsWidget component', () => {
  mockedAxios.get.mockImplementation(() => {
    return Promise.resolve({ data: mockRssFeedTen })
  })

  beforeEach(() => {
    mockedAxios.get.mockClear()
  })

  test('renders a widget that displays RSS items and a link to the News page', async () => {
    render(<NewsWidget widget={mockNewsWidget} />)

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Recent News'
    )
    expect(await screen.findAllByRole('article')).toHaveLength(10)

    expect(screen.getByRole('link', { name: 'View all' })).toHaveAttribute(
      'href',
      '/news-announcements'
    )
  })

  test('renders a settings menu', async () => {
    const user = userEvent.setup()
    render(<NewsWidget widget={mockNewsWidget} />)

    user.click(
      screen.getByRole('button', {
        name: 'Recent News Widget Settings',
      })
    )

    const removeButton = await screen.findByRole('button', {
      name: 'Remove Recent News widget',
    })

    expect(removeButton).toBeInTheDocument()
  })

  test('clicking in settings to remove widget passes correct values to modalContext', async () => {
    const user = userEvent.setup()
    const mockUpdateModalId = jest.fn()
    const mockUpdateModalText = jest.fn()
    const mockUpdateWidget = jest.fn()

    renderWithModalRoot(<NewsWidget widget={mockNewsWidget} />, {
      updateModalId: mockUpdateModalId,
      updateModalText: mockUpdateModalText,
      updateWidget: mockUpdateWidget,
    })

    await user.click(
      screen.getByRole('button', {
        name: 'Recent News Widget Settings',
      })
    )

    await user.click(
      await screen.findByRole('button', {
        name: 'Remove Recent News widget',
      })
    )

    expect(mockUpdateModalId).toHaveBeenCalledWith('removeNewsWidgetModal')
    expect(mockUpdateModalText).toHaveBeenCalledWith({
      headingText: 'Are you sure you’d like to delete this widget?',
      descriptionText:
        'You can re-add it to your My Space from the Add Widget menu.',
    })
    expect(mockUpdateWidget).toHaveBeenCalled()
  })
})
