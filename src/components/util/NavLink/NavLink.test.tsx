/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import React from 'react'
import { useRouter } from 'next/router'

import NavLink from './NavLink'

const mockedUseRouter = useRouter as jest.Mock

describe('NavLink component', () => {
  it('renders the link and props', () => {
    render(
      <NavLink href="/home" className="text-ink">
        Home
      </NavLink>
    )

    const link = screen.getByRole('link', {
      name: 'Home',
    })

    expect(link).toHaveAttribute('href', '/home')
    expect(link).toHaveTextContent('Home')
    expect(link).toHaveClass('text-ink')
    expect(link).toBeInstanceOf(HTMLAnchorElement)
  })

  it('does not render the active class if the path is not active', () => {
    mockedUseRouter.mockReturnValueOnce({
      route: '',
      pathname: '/about',
      query: '',
      asPath: '/about',
    })

    render(<NavLink href="/home">Home</NavLink>)

    const link = screen.getByRole('link', {
      name: 'Home',
    })

    expect(link).not.toHaveClass('usa-current')
  })

  it('renders the active class if the path is active', () => {
    mockedUseRouter.mockReturnValueOnce({
      route: '',
      pathname: '/about',
      query: '',
      asPath: '/about',
    })

    render(<NavLink href="/about">About</NavLink>)

    const link = screen.getByRole('link', {
      name: 'About',
    })

    expect(link).toHaveClass('usa-current')
  })

  it('renders the active class if the parent path matches', () => {
    mockedUseRouter.mockReturnValueOnce({
      route: '',
      pathname: '/about/subpage',
      query: '',
      asPath: '/about/subpage',
    })

    render(<NavLink href="/about">About</NavLink>)

    const link = screen.getByRole('link', {
      name: 'About',
    })

    expect(link).toHaveClass('usa-current')
  })

  it('does not render the active class if a subpage of the parent path', () => {
    mockedUseRouter.mockReturnValueOnce({
      route: '',
      pathname: '/about',
      query: '',
      asPath: '/about',
    })

    render(<NavLink href="/about/subpage">About</NavLink>)

    const link = screen.getByRole('link', {
      name: 'About',
    })

    expect(link).not.toHaveClass('usa-current')
  })

  describe('if the exact prop is set', () => {
    it('does not render the active class if the parent path matches', () => {
      mockedUseRouter.mockReturnValueOnce({
        route: '',
        pathname: '/about/subpage',
        query: '',
        asPath: '/about/subpage',
      })

      render(
        <NavLink href="/about" exact={true}>
          About
        </NavLink>
      )

      const link = screen.getByRole('link', {
        name: 'About',
      })

      expect(link).not.toHaveClass('usa-current')
    })

    it('renders the active class if the exact path matches', () => {
      mockedUseRouter.mockReturnValueOnce({
        route: '',
        pathname: '/about/subpage',
        query: '',
        asPath: '/about/subpage',
      })

      render(
        <NavLink href="/about/subpage" exact={true}>
          About
        </NavLink>
      )

      const link = screen.getByRole('link', {
        name: 'About',
      })

      expect(link).toHaveClass('usa-current')
    })
  })

  it('applies a custom active class', () => {
    mockedUseRouter.mockReturnValueOnce({
      route: '',
      pathname: '/about',
      query: '',
      asPath: '/about',
    })

    render(
      <NavLink href="/about" activeClass="activeLinkClass">
        About
      </NavLink>
    )

    const link = screen.getByRole('link', {
      name: 'About',
    })

    expect(link).not.toHaveClass('usa-current')
    expect(link).toHaveClass('activeLinkClass')
  })

  describe('if the URL is a URL Object', () => {
    // https://nextjs.org/docs/api-reference/next/link#with-url-object
    it('does not render the active class if the path is not active', () => {
      mockedUseRouter.mockReturnValueOnce({
        route: '',
        pathname: '/about',
        query: '',
        asPath: '/about',
      })

      render(<NavLink href={{ pathname: '/home' }}>Home</NavLink>)

      const link = screen.getByRole('link', {
        name: 'Home',
      })

      expect(link).not.toHaveClass('usa-current')
    })

    it('renders the active class if the path is active', () => {
      mockedUseRouter.mockReturnValueOnce({
        route: '',
        pathname: '/about',
        query: '',
        asPath: '/about',
      })

      render(<NavLink href={{ pathname: '/about' }}>About</NavLink>)

      const link = screen.getByRole('link', {
        name: 'About',
      })

      expect(link).toHaveClass('usa-current')
    })

    it('does not break if there is no path', () => {
      render(
        <NavLink href={{}} className="text-ink">
          Home
        </NavLink>
      )

      const link = screen.getByRole('link', {
        name: 'Home',
      })

      expect(link).toHaveAttribute('href', '')
      expect(link).toHaveTextContent('Home')
      expect(link).toHaveClass('text-ink')
      expect(link).toBeInstanceOf(HTMLAnchorElement)
    })
  })
})
