/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import { DateTime } from 'luxon'
import LandingPageIndexTable from './LandingPageIndexTable'

const testLandingPages = [
  {
    pageTitle: 'Test Landing Page 1',
    slug: 'test-landing-page-1',
    publishedDate: DateTime.now().toISO()!,
    status: 'Published' as 'Draft' | 'Published' | 'Archived',
  },
  {
    pageTitle: 'Test Landing Page 2',
    slug: 'test-landing-page-2',
    publishedDate: DateTime.now().toISO()!,
    status: 'Published' as 'Draft' | 'Published' | 'Archived',
  },
  {
    pageTitle: 'Test Landing Page 3',
    slug: 'test-landing-page-3',
    publishedDate: DateTime.now().toISO()!,
    status: 'Draft' as 'Draft' | 'Published' | 'Archived',
  },
  {
    pageTitle: 'Test Landing Page 4',
    slug: 'test-landing-page-4',
    publishedDate: DateTime.now().toISO()!,
    status: 'Archived' as 'Draft' | 'Published' | 'Archived',
  },
]

describe('LandingPageIndexTable', () => {
  test('renders without error', () => {
    render(<LandingPageIndexTable landingPages={testLandingPages} />)

    const table = document.querySelector('table')
    expect(table).toBeInTheDocument()

    expect(table).toHaveClass('usa-table--borderless')

    const rows = document.querySelectorAll('tr')
    expect(rows.length).toEqual(4)
  })

  test('renders draft tag for draft page', () => {
    render(<LandingPageIndexTable landingPages={testLandingPages} />)

    const table = document.querySelector('table')
    expect(table).toBeInTheDocument()

    expect(table).toHaveClass('usa-table--borderless')

    const rows = document.querySelectorAll('tr')
    expect(rows.length).toEqual(4)

    // expect published pages to not have a tag
    const noTag = rows[1].querySelector('td')?.querySelector('span')
    expect(noTag).toBeNull()

    // expect draft page to have a tag
    const draftTag = rows[2].querySelector('td')?.querySelector('span')
    expect(draftTag).toHaveTextContent('Draft')

    // expect archived page to have a tag
    const archivedTag = rows[3].querySelector('td')?.querySelector('span')
    expect(archivedTag).toHaveTextContent('Archived')
  })
})
