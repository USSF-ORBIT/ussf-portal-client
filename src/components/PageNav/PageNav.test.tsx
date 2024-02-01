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

describe('PageNav component', () => {
  describe('on any page', () => {
    test('renders links for the nav items', () => {
      render(<PageNav />)

      const links = screen.getAllByRole('link')

      links.forEach((link, index) => {
        const navItem = links[parseInt(`${index}`)]
        expect(link).toHaveAttribute('href', navItem.getAttribute('href'))
      })

      expect(links).toHaveLength(3)
    })

    test('renders nav items behind LaunchDarkly flags', () => {
      render(<PageNav />)

      const links = screen.getAllByRole('link')

      expect(links).toHaveLength(5)
    })
  })
})
