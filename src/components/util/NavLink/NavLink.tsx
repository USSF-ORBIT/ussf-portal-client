// Inspired by https://stackoverflow.com/questions/60324081/adding-active-class-for-nav-link-in-next-js
import React from 'react'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import { pathToRegexp } from 'path-to-regexp'

import LinkTo from '../LinkTo/LinkTo'
import type { PropTypes as LinkToProps } from '../LinkTo/LinkTo'

export type NavLinkProps = LinkToProps & {
  exact?: boolean
  activeClass?: string
}

const NavLink = ({
  className,
  exact,
  activeClass = 'usa-current',
  ...otherProps
}: NavLinkProps) => {
  const { href, as } = otherProps
  const { asPath } = useRouter()

  const pathProp = as || href
  const linkPath =
    typeof pathProp === 'string' ? pathProp : pathProp?.pathname || ''
  // #TODO this is throwing errors with the data from the cms
  // const isActive = pathToRegexp(linkPath, [], {
  //   sensitive: true,
  //   end: !!exact,
  // }).test(asPath)

  // const classes = classnames(className, {
  //   [activeClass]: isActive,
  // })

  return <LinkTo {...otherProps} />
}

export default NavLink
