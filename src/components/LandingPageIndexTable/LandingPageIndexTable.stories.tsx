import React from 'react'
import { Meta } from '@storybook/react'
import { DateTime, Settings } from 'luxon'
import LandingPageIndexTable from './LandingPageIndexTable'

export default {
  title: 'Components/LandingPageIndexTable',
  component: LandingPageIndexTable,
} as Meta

// for testing force the date to always be the same
Settings.now = () => new Date(2284, 8, 2, 14, 16).valueOf()

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
  {
    pageTitle:
      'Test Landing Page 6 with a really long title to ensure that the table is responsive',
    slug: 'test-landing-page-6',
    publishedDate: DateTime.now().plus({ weeks: 3 }).toISO()!,
    status: 'Published' as 'Draft' | 'Published' | 'Archived',
  },
]

export const ShowStatus = () => (
  <LandingPageIndexTable landingPages={testLandingPages} showStatus={true} />
)

export const HideStatus = () => (
  <LandingPageIndexTable landingPages={testLandingPages} showStatus={false} />
)
