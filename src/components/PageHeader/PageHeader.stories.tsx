import React from 'react'
import {
  BreadcrumbBar,
  Breadcrumb,
  BreadcrumbLink,
} from '@trussworks/react-uswds'
import type { Meta } from '@storybook/react'

import PageHeader from './PageHeader'

import PersonalData from 'components/PersonalData/PersonalData'
import NavLink, { NavLinkProps } from 'components/util/NavLink/NavLink'

export default {
  title: 'Navigation/PageHeader',
  component: PageHeader,
} as Meta

export const PortalHome = () => (
  <PageHeader>
    <PersonalData userDisplayName="Test Name" />
  </PageHeader>
)

export const NewsAndAnnouncements = () => (
  <PageHeader>
    <div>
      <h1>News &amp; Announcements</h1>
      <BreadcrumbBar>
        <Breadcrumb>
          <BreadcrumbLink<NavLinkProps> asCustom={NavLink} href="/">
            Service portal home
          </BreadcrumbLink>
        </Breadcrumb>
        <Breadcrumb current>News & Announcements</Breadcrumb>
      </BreadcrumbBar>
    </div>
  </PageHeader>
)
