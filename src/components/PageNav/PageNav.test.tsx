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
    beforeEach(() => {
      render(<PageNav />)
    })

    test('renders links for the nav items', () => {
      const links = screen.getAllByRole('link')

      links.forEach((link, index) => {
        const navItem = links[parseInt(`${index}`)]
        expect(link).toHaveAttribute('href', navItem.getAttribute('href'))
      })
    })
  })
})
