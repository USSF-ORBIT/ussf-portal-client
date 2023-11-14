import React from 'react'
import { SideNav } from '@trussworks/react-uswds'
import { useFlags } from 'launchdarkly-react-client-sdk'
import styles from './PageNav.module.scss'

import NavLink from 'components/util/NavLink/NavLink'

const PageNav = () => {
  const flags = useFlags()

  const navItems = [
    { path: '/', label: 'My Space' },
    {
      path: '/sites-and-applications',
      label: <>All sites &amp; applications</>,
    },
    { path: '/ussf-documentation', label: 'USSF documentation' },
  ]

  if (flags.guardianDirectory) {
    // TODO: we can remove this if and put the navItem in the correct slot above once fully released
    navItems.splice(1, 0, {
      path: '/guardian-directory',
      label: 'Guardian Directory',
    })
  }

  if (flags.landingPageIndex) {
    navItems.push({ path: '/landing', label: 'Landing Pages' })
  }

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
    <nav className={styles.PageNav} aria-label="Page navigation">
      <SideNav items={items} />
    </nav>
  )
}

export default PageNav
