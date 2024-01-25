/**
 * @jest-environment jsdom
 */

import { act, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import { SearchResultItem } from './SearchResultItem'
import {
  testApplicationResult,
  testArticleResultNoLabels,
  testDocumentationResult,
  testLandingPageResult,
} from '__fixtures__/data/searchResults'

describe('SearchResultItem component', () => {
  test('renders an Application result with no a11y violations', async () => {
    const { container } = render(
      <SearchResultItem item={testApplicationResult} />
    )

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.queryAllByRole('link')).toHaveLength(1)
    expect(screen.queryAllByRole('link')[0]).toHaveAttribute(
      'href',
      testApplicationResult.permalink
    )
    expect(screen.queryByRole('heading', { level: 3 })).toHaveTextContent(
      testApplicationResult.title
    )
    expect(
      screen.queryByText(testApplicationResult.preview)
    ).toBeInTheDocument()
    expect(screen.queryByText('Application')).toHaveClass('usa-tag')

    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  test('renders an Article result with no a11y violations', async () => {
    const { container } = render(
      <SearchResultItem item={testArticleResultNoLabels} />
    )

    expect(screen.queryByText('May')).toBeInTheDocument()
    expect(screen.queryByText('17')).toBeInTheDocument()

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.queryAllByRole('link')).toHaveLength(1)
    expect(screen.queryAllByRole('link')[0]).toHaveAttribute(
      'href',
      testArticleResultNoLabels.permalink
    )
    expect(screen.queryByRole('heading', { level: 3 })).toHaveTextContent(
      testArticleResultNoLabels.title
    )
    expect(
      screen.queryByText(testArticleResultNoLabels.preview)
    ).toBeInTheDocument()
    expect(screen.queryByText('USSF News')).toHaveClass('usa-tag')

    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  test('renders a Documentation result with no a11y violations', async () => {
    const { container } = render(
      <SearchResultItem item={testDocumentationResult} />
    )

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.queryAllByRole('link')).toHaveLength(1)
    expect(screen.queryAllByRole('link')[0]).toHaveAttribute(
      'href',
      testDocumentationResult.permalink
    )
    expect(screen.queryByRole('heading', { level: 3 })).toHaveTextContent(
      testDocumentationResult.title
    )
    expect(
      screen.queryByText(testDocumentationResult.preview)
    ).toBeInTheDocument()
    expect(screen.queryByText('USSF Documentation')).toHaveClass('usa-tag')

    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  test('renders a Landing Page result with no a11y violations', async () => {
    const { container } = render(
      <SearchResultItem item={testLandingPageResult} />
    )

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.queryAllByRole('link')).toHaveLength(1)
    expect(screen.queryAllByRole('link')[0]).toHaveAttribute(
      'href',
      testLandingPageResult.permalink
    )
    expect(screen.queryByRole('heading', { level: 3 })).toHaveTextContent(
      testLandingPageResult.title
    )
    expect(
      screen.queryByText(testLandingPageResult.preview)
    ).toBeInTheDocument()
    expect(screen.queryByText('Landing Page')).toHaveClass('usa-tag')

    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
