import React from 'react'
import { Meta } from '@storybook/react'
import PageNav from './PageNav'

export default {
  title: 'Navigation/PageNav',
  component: PageNav,
} as Meta

const navItems = [
  { path: '/', label: 'My Space' },
  { path: '/profile', label: 'My profile' },
  { path: '/subordinates', label: 'Subordinate profiles' },
  { path: '/reminders', label: 'Manage reminders' },
  { path: '/sites-and-applications', label: <>All sites &amp; applications</> },
]

export const PageNavigation = () => <PageNav navItems={navItems} />

PageNavigation.story = {
  parameters: {
    nextRouter: {
      pathname: '/',
      asPath: '/',
    },
  },
}

export const OnSitesAndApplicationsPage = () => <PageNav navItems={navItems} />

OnSitesAndApplicationsPage.story = {
  parameters: {
    nextRouter: {
      pathname: '/sites-and-applications',
      asPath: '/sites-and-applications',
    },
  },
}
