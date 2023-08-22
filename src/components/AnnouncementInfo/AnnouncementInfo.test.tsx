/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react'

import React from 'react'
import AnnouncementInfo from './AnnouncementInfo'
import * as openDocumentLink from 'helpers/openDocumentLink'
import {
  testAnnouncementWithArticle,
  testAnnouncementWithArticleNoSlug,
  testAnnouncementWithDeletedArticle,
  testAnnouncementWithUrl,
  testAnnouncementWithPdfDocument,
  testAnnouncementWithJpgDocument,
} from '__fixtures__/data/cmsAnnouncments'

// Spy on the functions that test files and opens PDFs in the browser
// We are not mocking because we want to test isPdf
jest.spyOn(openDocumentLink, 'handleOpenPdfLink').mockImplementation()
jest.spyOn(openDocumentLink, 'isPdf')

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

  test('renders an announcement with a pdf document CTA', async () => {
    const pdfString =
      testAnnouncementWithPdfDocument.body.document[1].props?.link?.value?.data
        ?.file?.url

    render(<AnnouncementInfo announcement={testAnnouncementWithPdfDocument} />)

    expect(screen.getAllByText('Test Announcement Document')).toHaveLength(1)
    expect(screen.getAllByText('Read more')).toHaveLength(1)

    const link = screen.getByRole('link', { name: 'Read more' })
    expect(link).toHaveAttribute('href', pdfString)

    fireEvent.click(link)
    expect(openDocumentLink.isPdf).toHaveBeenCalledTimes(1)
    expect(openDocumentLink.isPdf).toHaveBeenCalledWith(pdfString)
    expect(openDocumentLink.handleOpenPdfLink).toHaveBeenCalledTimes(1)
    expect(openDocumentLink.handleOpenPdfLink).toHaveBeenCalledWith(pdfString)
  })

  test('renders an announcement with a non-pdf document CTA', async () => {
    jest.resetAllMocks()

    const jpgString =
      testAnnouncementWithJpgDocument.body.document[1].props?.link?.value?.data
        ?.file?.url

    render(<AnnouncementInfo announcement={testAnnouncementWithJpgDocument} />)

    expect(screen.getAllByText('Test Announcement Jpg Document')).toHaveLength(
      1
    )
    expect(screen.getAllByText('Read more')).toHaveLength(1)

    const link = screen.getByRole('link', { name: 'Read more' })
    expect(link).toHaveAttribute('href', jpgString)

    fireEvent.click(link)
    expect(openDocumentLink.isPdf).toHaveBeenCalledTimes(1)
    expect(openDocumentLink.isPdf).toHaveBeenCalledWith(jpgString)

    expect(openDocumentLink.handleOpenPdfLink).toHaveBeenCalledTimes(0)
  })
})
