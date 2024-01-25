/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import React from 'react'
import { SingleArticle } from './SingleArticle'
import type { ArticleRecord, LabelRecord } from 'types'
import {
  cmsInternalNewsArticle as testArticle,
  cmsInternalNewsArticleWithVideo as videoArticle,
} from '__fixtures__/data/cmsInternalNewsArticle'

describe('SingleArticle component', () => {
  test('renders the article', () => {
    render(<SingleArticle article={testArticle} />)

    const banner = screen.queryByText('Draft Article Preview')
    expect(banner).toBeNull()
    expect(screen.getByText('May 18, 2022')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      testArticle.title
    )
  })

  test("renders the article's hero image", () => {
    render(<SingleArticle article={testArticle} />)

    const img = screen.getByRole('img', { name: 'article hero graphic' })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src')
    expect(img.getAttribute('src')).toEqual(
      'http://cms.example.com/images/image.png'
    )
    expect(img).toHaveClass('hero')
  })

  test('does not render an img tag if article has no hero url', () => {
    const noHero = { ...testArticle, hero: undefined }
    render(<SingleArticle article={noHero} />)

    const img = screen.queryByRole('img', {
      name: 'article hero graphic',
    })
    expect(img).not.toBeInTheDocument()
  })

  test('renders the unpublished article preview banner if article is not published', () => {
    const unpublished: ArticleRecord = { ...testArticle, status: 'Draft' }
    render(<SingleArticle article={unpublished} />)

    const banner = screen.getByText('Draft Article Preview')
    expect(banner).toBeVisible()
    expect(banner).toHaveClass('previewBanner')
  })

  test('renders labels for the article', () => {
    const label: LabelRecord = {
      id: '001',
      name: 'lorem ipsum',
      type: 'Source',
    }
    const labeledArticle: ArticleRecord = { ...testArticle, labels: [label] }
    render(<SingleArticle article={labeledArticle} />)

    expect(screen.getByText('lorem ipsum')).toBeVisible()
  })

  test('renders tags for the article', () => {
    const tags = [
      { id: '1', name: 'dolor' },
      { id: '2', name: 'sit' },
    ]
    const labeledArticle: ArticleRecord = { ...testArticle, tags }
    render(<SingleArticle article={labeledArticle} />)

    expect(screen.getByText('dolor')).toBeVisible()
    expect(screen.getByText('sit')).toBeVisible()
  })
  test('renders byline for the article', () => {
    const byline = { name: 'The Editors' }
    const labeledArticle: ArticleRecord = { ...testArticle, byline }
    render(<SingleArticle article={labeledArticle} />)

    expect(screen.getByText('The Editors')).toBeVisible()
  })
  test('renders location for the article', () => {
    const location = { name: 'USSF HQ' }
    const labeledArticle: ArticleRecord = { ...testArticle, location }
    render(<SingleArticle article={labeledArticle} />)

    expect(screen.getByText('USSF HQ')).toBeVisible()
  })
  test('renders a video if the article has a video', () => {
    render(<SingleArticle article={videoArticle} />)

    const video = screen.getByTestId('embedVideo')
    expect(video).toBeInTheDocument()
    expect(video).toHaveAttribute('src')
    expect(video.getAttribute('src')).toEqual(
      'https://youtube.com/embed/EdK9RRpofI4'
    )
  })
})
