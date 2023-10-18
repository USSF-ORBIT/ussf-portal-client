// Inspired by https://stackoverflow.com/questions/60324081/adding-active-class-for-nav-link-in-next-js
import React from 'react'
import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import classnames from 'classnames'
import { pathToRegexp } from 'path-to-regexp'

export type NavLinkProps = LinkProps & {
  children: React.ReactNode
  className?: string
  exact?: boolean
  activeClass?: string
}

const NavLink = ({
  children,
  className,
  exact,
  activeClass = 'usa-current',
  ...otherProps
}: NavLinkProps) => {
  const { href } = otherProps
  const { asPath } = useRouter()

  const pathProp = href

  const linkPath =
    typeof pathProp === 'string' ? pathProp : pathProp?.pathname || ''

  const isActive = pathToRegexp(linkPath, [], {
    sensitive: true,
    end: !!exact,
  }).test(asPath)

  const classes = classnames(className, {
    [activeClass]: isActive,
  })

  return (
    <Link {...otherProps} className={classes}>
      {children}
    </Link>
  )
}

export default NavLink
