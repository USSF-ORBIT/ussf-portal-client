/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import LandingPageIndexTable from './LandingPageIndexTable'

const testLandingPages = [
  {
    pageTitle: 'Test Landing Page 1',
    slug: 'test-landing-page-1',
  },
  {
    pageTitle: 'Test Landing Page 2',
    slug: 'test-landing-page-2',
  },
  {
    pageTitle: 'Test Landing Page 3',
    slug: 'test-landing-page-3',
  },
]

describe('LandingPageIndexTable', () => {
  test('renders without error', () => {
    render(<LandingPageIndexTable landingPages={testLandingPages} />)

    const table = document.querySelector('table')
    expect(table).toBeInTheDocument()

    expect(table).toHaveClass('usa-table--borderless')

    const rows = document.querySelectorAll('tr')
    expect(rows.length).toEqual(3)
  })
})
