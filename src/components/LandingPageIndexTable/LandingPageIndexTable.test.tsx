/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import { DateTime } from 'luxon'
import LandingPageIndexTable from './LandingPageIndexTable'

const expectedFutueDate = DateTime.now().plus({ weeks: 2 })
const expectedPastDate = DateTime.now().minus({ weeks: 2 })
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
    publishedDate: expectedPastDate.toISO()!,
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
  {
    pageTitle: 'Test Landing Page 5',
    slug: 'test-landing-page-5',
    publishedDate: expectedFutueDate.toISO()!,
    status: 'Published' as 'Draft' | 'Published' | 'Archived',
  },
]

describe('LandingPageIndexTable', () => {
  test('renders without error', () => {
    render(
      <LandingPageIndexTable
        landingPages={testLandingPages}
        showStatus={true}
      />
    )

    const table = document.querySelector('table')
    expect(table).toBeInTheDocument()

    expect(table).toHaveClass('usa-table--borderless')

    const rows = document.querySelectorAll('tr')
    expect(rows.length).toEqual(5)
  })

  test('renders draft tag for draft page', () => {
    render(
      <LandingPageIndexTable
        landingPages={testLandingPages}
        showStatus={true}
      />
    )

    const rows = document.querySelectorAll('tr')

    // expect draft page to have a tag
    const draftTag = rows[2].querySelector('td')?.querySelector('span')
    expect(draftTag).toHaveTextContent('Draft')
  })

  test('renders tag for page published in past', () => {
    render(
      <LandingPageIndexTable
        landingPages={testLandingPages}
        showStatus={true}
      />
    )

    const rows = document.querySelectorAll('tr')

    // expect published page to have a tag
    const published = rows[1].querySelector('td')?.querySelector('span')
    expect(published).toHaveTextContent(
      `Published on: ${expectedPastDate.toFormat('dd MMM yyyy HH:mm')}`
    )
  })

  test('renders published tag for page published in the future', () => {
    render(
      <LandingPageIndexTable
        landingPages={testLandingPages}
        showStatus={true}
      />
    )

    const rows = document.querySelectorAll('tr')

    // expect published page to have a tag
    const published = rows[4].querySelector('td')?.querySelector('span')
    expect(published).toHaveTextContent(
      `Publishing on: ${expectedFutueDate.toFormat('dd MMM yyyy HH:mm')}`
    )
  })

  test('renders archived tag for archived page', () => {
    render(
      <LandingPageIndexTable
        landingPages={testLandingPages}
        showStatus={true}
      />
    )

    const rows = document.querySelectorAll('tr')

    // expect archived page to have a tag
    const archivedTag = rows[3].querySelector('td')?.querySelector('span')
    expect(archivedTag).toHaveTextContent('Archived')
  })

  test('renders no status tags if showStatus false', () => {
    render(
      <LandingPageIndexTable
        landingPages={testLandingPages}
        showStatus={false}
      />
    )

    const rows = document.querySelectorAll('tr')

    // expect all pages to not have a tag
    rows.forEach((row) => {
      const noTag = row.querySelector('td')?.querySelector('span')
      expect(noTag).toBeNull()
    })
  })
})
