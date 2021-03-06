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
  title: 'Layout/PageHeader',
  component: PageHeader,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const PortalHome = () => (
  <PageHeader>
    <PersonalData />
  </PageHeader>
)

export const PortalHomeDisabledSearch = () => (
  <PageHeader disableSearch>
    <PersonalData />
  </PageHeader>
)

export const NewsAndAnnouncements = () => (
  <PageHeader disableSearch>
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
