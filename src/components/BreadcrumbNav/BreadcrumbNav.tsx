import React from 'react'
import {
  BreadcrumbBar,
  Breadcrumb,
  BreadcrumbLink,
} from '@trussworks/react-uswds'

import NavLink, { NavLinkProps } from 'components/util/NavLink/NavLink'

type PropTypes = {
  navItems: {
    path: string
    label: React.ReactNode
    current?: boolean
  }[]
}

const BreadcrumbNav = ({ navItems }: PropTypes) => (
  <BreadcrumbBar>
    {navItems.map((i) =>
      i.current ? (
        <Breadcrumb key={`nav_${i.path}`} current>
          {i.label}
        </Breadcrumb>
      ) : (
        <Breadcrumb key={`nav_${i.path}`}>
          <BreadcrumbLink<NavLinkProps> asCustom={NavLink} href={i.path}>
            {i.label}
          </BreadcrumbLink>
        </Breadcrumb>
      )
    )}
  </BreadcrumbBar>
)

export default BreadcrumbNav
