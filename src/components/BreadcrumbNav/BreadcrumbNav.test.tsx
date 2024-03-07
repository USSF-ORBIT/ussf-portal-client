/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'

import BreadcrumbNav from './BreadcrumbNav'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '',
    pathname: '',
    query: '',
    asPath: '',
  }),
}))

const navItems = [
  { path: '/', label: 'Service portal home' },
  { path: '/news-announcements', label: 'News & Announcements', current: true },
]

describe('BreadcrumbNav component', () => {
  beforeEach(() => {
    render(<BreadcrumbNav navItems={navItems} />)
  })

  test('renders links for the non-current nav items', () => {
    const links = screen.getAllByRole('link')

    expect(links).toHaveLength(1)
    expect(links[0]).toHaveAttribute('href', navItems[0].path)
    expect(links[0]).toHaveTextContent(navItems[0].label)
  })

  test('renders the current item as static text', () => {
    expect(screen.getByText('News & Announcements')).toBeInstanceOf(
      HTMLLIElement
    )
    expect(screen.getByText('News & Announcements')).toHaveAttribute(
      'aria-current',
      'page'
    )
  })
})
