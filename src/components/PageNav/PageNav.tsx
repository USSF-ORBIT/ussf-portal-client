import React from 'react'
import { SideNav } from '@trussworks/react-uswds'
import styles from './PageNav.module.scss'

import NavLink from 'components/util/NavLink/NavLink'

const PageNav = () => {
  const navItems = [
    { path: '/', label: 'My Space' },
    {
      path: '/guardian-directory',
      label: 'Guardian Directory',
    },
    {
      path: '/sites-and-applications',
      label: <>All sites &amp; applications</>,
    },
    { path: '/ussf-documentation', label: 'USSF documentation' },
    { path: '/landing', label: 'Landing Pages' },
  ]

  const items = navItems.map((i) => (
    <NavLink
      href={i.path}
      key={`nav_${i.path}`}
      className="usa-nav__link"
      exact={i.path === '/'}>
      <span>{i.label}</span>
    </NavLink>
  ))

  return (
    <nav className={styles.PageNav} aria-label="Portal">
      <SideNav items={items} />
    </nav>
  )
}

export default PageNav
