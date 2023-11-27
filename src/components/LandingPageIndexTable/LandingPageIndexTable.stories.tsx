import React from 'react'
import { Meta } from '@storybook/react'
import LandingPageIndexTable from './LandingPageIndexTable'

export default {
  title: 'Components/LandingPageIndexTable',
  component: LandingPageIndexTable,
} as Meta

const testLandingPages = [
  {
    pageTitle: 'Test Landing Page 1',
    slug: 'test-landing-page-1',
  },
  {
    pageTitle: 'Test Landing Page 2',
    slug: 'test-landing-page-2',
  },
  {
    pageTitle: 'Test Landing Page 3',
    slug: 'test-landing-page-3',
  },
]

export const ExampleLandingPageIndexTable = () => (
  <LandingPageIndexTable landingPages={testLandingPages} />
)
