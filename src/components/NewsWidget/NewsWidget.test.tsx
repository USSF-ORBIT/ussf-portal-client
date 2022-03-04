/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

import { renderWithModalRoot } from '../../testHelpers'
import NewsWidget from './NewsWidget'

import mockRssFeed from '__mocks__/news-rss'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('NewsWidget component', () => {
  const mockHandleRemove = jest.fn()

  mockedAxios.get.mockImplementation(() => {
    return Promise.resolve({ data: mockRssFeed })
  })

  beforeEach(() => {
    mockedAxios.get.mockClear()
  })

  it('renders a widget that displays RSS items and a link to the News page', async () => {
    render(<NewsWidget onRemove={mockHandleRemove} />)

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
    render(<NewsWidget onRemove={mockHandleRemove} />)

    userEvent.click(
      screen.getByRole('button', {
        name: 'Section Settings',
      })
    )

    const removeButton = await screen.findByRole('button', {
      name: 'Remove this section',
    })

    expect(removeButton).toBeInTheDocument()
  })

  it('clicking the remove section button opens the confirmation modal', async () => {
    renderWithModalRoot(<NewsWidget onRemove={mockHandleRemove} />)

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

    // Open modal
    expect(
      screen.getByRole('dialog', {
        name: 'Are you sure you’d like to delete this section?',
      })
    ).toHaveClass('is-visible')

    expect(mockHandleRemove).not.toHaveBeenCalled()
  })

  it('clicking the cancel button in the modal closes the confirmation modal', async () => {
    renderWithModalRoot(<NewsWidget onRemove={mockHandleRemove} />)

    userEvent.click(
      screen.getByRole('button', {
        name: 'Section Settings',
      })
    )

    userEvent.click(
      await screen.findByRole('button', {
        name: 'Remove this section',
      })
    )

    // Open modal
    const confirmationModal = screen.getByRole('dialog', {
      name: 'Are you sure you’d like to delete this section?',
    })

    expect(confirmationModal).toHaveClass('is-visible')
    const cancelButton = within(confirmationModal).getByRole('button', {
      name: 'Cancel',
    })
    userEvent.click(cancelButton)

    expect(mockHandleRemove).toHaveBeenCalledTimes(0)
    expect(
      screen.getByRole('dialog', {
        name: 'Are you sure you’d like to delete this section?',
      })
    ).toHaveClass('is-hidden')
  })

  it('clicking the confirm button in the modal calls the remove handler and closes the confirmation modal', async () => {
    renderWithModalRoot(<NewsWidget onRemove={mockHandleRemove} />)

    expect(
      screen.getByRole('dialog', {
        name: 'Are you sure you’d like to delete this section?',
      })
    ).toHaveClass('is-hidden')

    userEvent.click(
      screen.getByRole('button', {
        name: 'Section Settings',
      })
    )

    userEvent.click(
      await screen.findByRole('button', {
        name: 'Remove this section',
      })
    )

    // Open modal
    const confirmationModal = screen.getByRole('dialog', {
      name: 'Are you sure you’d like to delete this section?',
    })

    expect(confirmationModal).toHaveClass('is-visible')
    userEvent.click(
      within(confirmationModal).getByRole('button', {
        name: 'Delete',
      })
    )

    expect(mockHandleRemove).toHaveBeenCalledTimes(1)
    expect(
      screen.getByRole('dialog', {
        name: 'Are you sure you’d like to delete this section?',
      })
    ).toHaveClass('is-hidden')
  })
})
