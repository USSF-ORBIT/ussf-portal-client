import { DateTime } from 'luxon'

export const mockLandingPages = [
  {
    pageDescription: 'This is a test landing page',
    pageTitle: 'Test Landing Page',
    slug: 'test-landing-page',
    publishedDate: DateTime.now().toISO()!,
    status: 'Published' as 'Draft' | 'Published' | 'Archived',
  },
  {
    pageDescription: 'Another landing page',
    pageTitle: 'Another Landing Page',
    slug: 'another-landing-page',
    publishedDate: DateTime.now().toISO()!,
    status: 'Published' as 'Draft' | 'Published' | 'Archived',
  },
  {
    pageDescription: 'Draft landing page',
    pageTitle: 'Another Landing Page',
    slug: 'draft-landing-page',
    publishedDate: '',
    status: 'Draft' as 'Draft' | 'Published' | 'Archived',
  },
]
