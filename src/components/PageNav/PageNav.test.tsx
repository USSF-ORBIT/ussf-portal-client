/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'

import PageNav from './PageNav'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '',
    pathname: '',
    query: '',
    asPath: '',
  }),
}))

const navItems = [
  { path: '/', label: 'My Space' },
  { path: '/profile', label: 'My profile' },
  { path: '/subordinates', label: 'Subordinate profiles' },
  { path: '/reminders', label: 'Manage reminders' },
  { path: '/sites-and-applications', label: <>All sites &amp; applications</> },
]

describe('PageNav component', () => {
  describe('on any page', () => {
    beforeEach(() => {
      render(<PageNav navItems={navItems} />)
    })

    it('renders links for the nav items', () => {
      const links = screen.getAllByRole('link')

      expect(links).toHaveLength(navItems.length)

      links.forEach((link, index) => {
        const navItem = navItems[parseInt(`${index}`)]
        expect(link).toHaveAttribute('href', navItem.path)
      })
    })
  })
})
