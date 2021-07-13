/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'

import Header from './Header'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '',
    pathname: '',
    query: '',
    asPath: '',
  }),
}))

const mockedUseRouter = useRouter as jest.Mock

describe('Header component', () => {
  describe('on any page', () => {
    beforeEach(() => {
      render(<Header />)
    })

    it('renders the Space Force logo', () => {
      expect(screen.getByAltText('Space Force')).toBeInTheDocument()
    })

    it('renders the primary navigation links', () => {
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()

      // There are two "Home" links because the logo is also one
      const homeLinks = screen.getAllByRole('link', { name: 'Home' })
      expect(homeLinks).toHaveLength(2)
      homeLinks.forEach((l) => {
        expect(l).toBeInstanceOf(HTMLAnchorElement)
      })

      // Test for other links
      expect(screen.getByRole('link', { name: 'News' })).toBeInstanceOf(
        HTMLAnchorElement
      )
      expect(
        screen.getByRole('link', { name: 'Training and education' })
      ).toBeInstanceOf(HTMLAnchorElement)
      expect(screen.getByRole('link', { name: 'About us' })).toBeInstanceOf(
        HTMLAnchorElement
      )
    })

    it('renders the Service Portal subnav', () => {
      const toggleButton = screen.getByRole('button', {
        name: 'Your Service Portal',
      })
      expect(toggleButton).toBeInstanceOf(HTMLButtonElement)

      userEvent.click(toggleButton)

      expect(screen.getByRole('link', { name: 'Army' })).toBeInstanceOf(
        HTMLAnchorElement
      )
      expect(screen.getByRole('link', { name: 'Navy' })).toBeInstanceOf(
        HTMLAnchorElement
      )
      expect(screen.getByRole('link', { name: 'Air Force' })).toBeInstanceOf(
        HTMLAnchorElement
      )
      expect(screen.getByRole('link', { name: 'Marines' })).toBeInstanceOf(
        HTMLAnchorElement
      )
      expect(screen.getByRole('link', { name: 'Coast Guard' })).toBeInstanceOf(
        HTMLAnchorElement
      )
    })
  })

  describe('on the home page', () => {
    beforeEach(() => {
      mockedUseRouter.mockReturnValueOnce({
        route: '',
        pathname: '/',
        query: '',
        asPath: '/',
      })

      render(<Header />)
    })

    it('renders the home page header', () => {
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: 'Space Force Portal home',
        })
      ).toBeInTheDocument()
    })

    it('shows in-page links', () => {
      expect(
        screen.getByRole('link', { name: 'Manage your life' })
      ).toBeInstanceOf(HTMLAnchorElement)

      expect(screen.getByRole('link', { name: 'Work tools' })).toBeInstanceOf(
        HTMLAnchorElement
      )
    })
  })

  describe('on the news page', () => {
    beforeEach(() => {
      mockedUseRouter.mockReturnValueOnce({
        route: '',
        pathname: '/news',
        query: '',
        asPath: '/news',
      })

      render(<Header />)
    })

    it('renders the site name', () => {
      expect(screen.getByText('Space Force Portal')).toBeInTheDocument()
    })

    it('adds the current link class to navigation', () => {
      const newsLink = screen.getByRole('link', { name: 'News' })
      expect(newsLink).toHaveClass('usa-current')
    })
  })

  describe('mobile nav', () => {
    beforeEach(() => {
      render(<Header />)
    })

    it('hides the mobile nav by default', () => {
      expect(screen.getByTestId('overlay')).not.toHaveClass('is-visible')
    })

    it('can toggle the mobile nav', () => {
      const overlay = screen.getByTestId('overlay')
      userEvent.click(screen.getByRole('button', { name: 'Menu' }))
      expect(overlay).toHaveClass('is-visible')
      userEvent.click(screen.getByRole('button', { name: 'close' }))
      expect(overlay).not.toHaveClass('is-visible')
    })
  })
})
