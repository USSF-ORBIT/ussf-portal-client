/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react'

import React from 'react'

import AnnouncementInfo from './AnnouncementInfo'
import {
  testAnnouncementWithArticle,
  testAnnouncementWithArticleNoSlug,
  testAnnouncementWithDeletedArticle,
  testAnnouncementWithUrl,
  testAnnouncementWithDocument,
} from '__fixtures__/data/cmsAnnouncments'
import { handleOpenPdfLink } from 'helpers/openDocumentLink'

// Mock the function that opens PDFs in the browser
jest.mock('helpers/openDocumentLink', () => ({
  isPdf: jest.fn(),
  handleOpenPdfLink: jest.fn(),
}))

describe('AnnouncementInfo component', () => {
  test('renders an announcement with a url CTA', () => {
    render(<AnnouncementInfo announcement={testAnnouncementWithUrl} />)

    expect(screen.getAllByText('Test Announcement')).toHaveLength(1)
    expect(screen.getAllByText('View more')).toHaveLength(1)
  })

  test('renders an announcement with a default url if none is provided', () => {
    render(
      <AnnouncementInfo announcement={testAnnouncementWithArticleNoSlug} />
    )
    expect(screen.getAllByText('Cool new article')).toHaveLength(1)

    const link = screen.getByRole('link', { name: 'View article' })
    expect(link).toHaveAttribute('href', '/404')
  })

  test('renders an announcement with an article CTA', () => {
    render(<AnnouncementInfo announcement={testAnnouncementWithArticle} />)

    expect(screen.getAllByText('Cool new article')).toHaveLength(1)
    expect(screen.getAllByText('View article')).toHaveLength(1)
    const link = screen.getByRole('link', { name: 'View article' })
    expect(link).toHaveAttribute('href', '/articles/something')
  })

  test('renders an announcement with a missing article CTA', () => {
    render(
      <AnnouncementInfo announcement={testAnnouncementWithDeletedArticle} />
    )

    expect(screen.getAllByText('Cool new deleted article')).toHaveLength(1)
    expect(screen.getAllByText('View deleted article')).toHaveLength(1)
    const link = screen.getByRole('link', { name: 'View deleted article' })
    expect(link).toHaveAttribute('href', '/404')
  })

  test('renders an announcement with a document CTA', async () => {
    const pdfString =
      testAnnouncementWithDocument.body.document[1].props?.link?.value?.data
        ?.file?.url

    render(<AnnouncementInfo announcement={testAnnouncementWithDocument} />)

    expect(screen.getAllByText('Test Announcement Document')).toHaveLength(1)
    expect(screen.getAllByText('Read more')).toHaveLength(1)

    const link = screen.getByRole('link', { name: 'Read more' })
    expect(link).toHaveAttribute('href', pdfString)

    fireEvent.click(link)
    expect(handleOpenPdfLink).toHaveBeenCalledTimes(1)
    expect(handleOpenPdfLink).toHaveBeenCalledWith(pdfString)
  })
})
