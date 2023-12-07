import React from 'react'
import { Meta } from '@storybook/react'
import { DateTime } from 'luxon'
import LandingPageIndexTable from './LandingPageIndexTable'

export default {
  title: 'Components/LandingPageIndexTable',
  component: LandingPageIndexTable,
} as Meta

const testLandingPages = [
  {
    pageTitle: 'Test Landing Page 1',
    slug: 'test-landing-page-1',
    publishedDate: DateTime.now().toISO()!,
    status: 'Published' as 'Draft' | 'Published' | 'Archived',
  },
  {
    pageTitle: 'Test Landing Page 4',
    slug: 'test-landing-page-4',
    publishedDate: DateTime.now().toISO()!,
    status: 'Archived' as 'Draft' | 'Published' | 'Archived',
  },
  {
    pageTitle: 'Test Landing Page 2',
    slug: 'test-landing-page-2',
    publishedDate: DateTime.now().toISO()!,
    status: 'Published' as 'Draft' | 'Published' | 'Archived',
  },
  {
    pageTitle: 'Test Landing Page 3',
    slug: 'test-landing-page-3',
    publishedDate: DateTime.now().toISO()!,
    status: 'Draft' as 'Draft' | 'Published' | 'Archived',
  },
  {
    pageTitle: 'Test Landing Page 5',
    slug: 'test-landing-page-5',
    publishedDate: DateTime.now().plus({ weeks: 2 }).toISO()!,
    status: 'Published' as 'Draft' | 'Published' | 'Archived',
  },
]

export const ExampleLandingPageIndexTable = () => (
  <LandingPageIndexTable landingPages={testLandingPages} />
)
