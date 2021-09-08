import React from 'react'
import { SideNav } from '@trussworks/react-uswds'

import NavLink from 'components/util/NavLink/NavLink'

type PropTypes = {
  navItems: {
    path: string
    label: React.ReactNode
  }[]
}

const PageNav = ({ navItems }: PropTypes) => {
  const items = navItems.map((i) => (
    <NavLink
      href={i.path}
      key={`nav_${i.path}`}
      className="usa-nav__link"
      exact={i.path === '/'}>
      <span>{i.label}</span>
    </NavLink>
  ))

  return <SideNav items={items} />
}

export default PageNav
