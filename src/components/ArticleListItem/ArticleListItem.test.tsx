/**
 * @jest-environment jsdom
 */

import { act, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'
import { ArticleListItem } from './ArticleListItem'
import { ArticleListItemRecord } from 'types'

const cmsTestArticle: ArticleListItemRecord = {
  id: 'testArticleId123',
  labels: [{ id: 'labelId', name: 'CMS Test Label', type: 'Source' }],
  slug: 'test-article',
  title:
    'Version 2.8.5 released! Includes MVP search experience and a way to filter the news.',
  preview:
    'This article is a test. Vestibulum in turpis vitae arcu tincidunt maximus sit amet suscipit justo. Morbi lobortis posuere mollis. Suspendisse egestas egestas sapien eu blandit. In euismod suscipit nisi, eget vulputate tellus. Cras vel nisi nec urna facilisis luctus. Phasellus vel sagittis lacus. Ut dapibus ipsum arcu, nec semper ipsum malesuada in. Aliquam et lectus pharetra, gravida eros suscipit, tincidunt libero. Fusce vel ultrices tellus, vel pulvinar diam. Vestibulum pharetra vehicula lacinia.',
  publishedDate: '2022-05-17T13:44:39.796Z',
}

const rssTestArticle = {
  id: 'rssArticle123',
  preview:
    'In May 2022, the U.S. Space Force held a Cyber Constructive Service (CCS) Credit Board, in which the',
  publishedDate: 'Aug 01, 2022',
  source: 'RSS',
  sourceLink:
    'https://www.spaceforce.mil/News/Article/3111951/us-space-force-conducts-innovative-talent-acquisition-process/',
  sourceName: 'SPACEFORCE.mil',
  title: 'U.S. Space Force conducts innovative talent acquisition process',
}

describe('ArticleListItem component', () => {
  it('renders the article preview of a cms article', () => {
    render(<ArticleListItem article={cmsTestArticle} />)

    expect(screen.getByText('May')).toBeInTheDocument()
    expect(screen.getByText('17')).toBeInTheDocument()

    expect(screen.getAllByText(cmsTestArticle.title)).toHaveLength(1)
    expect(screen.getByText(cmsTestArticle.preview)).toBeInTheDocument()
    expect(screen.getByText('CMS Test Label')).toBeInTheDocument()
  })

  it('cms article has no a11y violations', async () => {
    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      const { container } = render(<ArticleListItem article={cmsTestArticle} />)
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  it('renders the article preview of an rss article', () => {
    render(<ArticleListItem article={rssTestArticle} />)

    expect(screen.getByText('Aug')).toBeInTheDocument()
    expect(screen.getByText('01')).toBeInTheDocument()

    expect(screen.getAllByText(rssTestArticle.title)).toHaveLength(1)
    expect(screen.getByText(rssTestArticle.preview)).toBeInTheDocument()
    expect(screen.getByText(rssTestArticle.sourceName)).toBeInTheDocument()
  })

  it('rss article has no a11y violations', async () => {
    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      const { container } = render(<ArticleListItem article={rssTestArticle} />)
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  it('renders the article preview of an rss article', () => {
    render(<ArticleListItem article={rssTestArticle} />)

    expect(screen.getByText('Aug')).toBeInTheDocument()
    expect(screen.getByText('01')).toBeInTheDocument()

    expect(screen.getAllByText(rssTestArticle.title)).toHaveLength(1)
    expect(screen.getByText(rssTestArticle.preview)).toBeInTheDocument()
    expect(screen.getByText(rssTestArticle.sourceName)).toBeInTheDocument()
  })
})
