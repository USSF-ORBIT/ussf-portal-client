import React from 'react'
import { Meta } from '@storybook/react'
import PageNav from './PageNav'

export default {
  title: 'Navigation/PageNav',
  component: PageNav,
} as Meta

export const PageNavigation = () => <PageNav />

PageNavigation.story = {
  parameters: {
    nextRouter: {
      pathname: '/',
      asPath: '/',
    },
  },
}

export const OnSitesAndApplicationsPage = () => <PageNav />

OnSitesAndApplicationsPage.story = {
  parameters: {
    nextRouter: {
      pathname: '/sites-and-applications',
      asPath: '/sites-and-applications',
    },
  },
}
