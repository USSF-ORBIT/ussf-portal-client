export const SPACEFORCE_NEWS_RSS_URL = `https://www.spaceforce.mil/DesktopModules/ArticleCS/RSS.ashx?ContentType=1&Site=1060`

export const WIDGET_TYPES = {
  COLLECTION: 'Collection',
  NEWS: 'News',
  GUARDIANIDEAL: 'GuardianIdeal',
  FEATUREDSHORTCUTS: 'FeaturedShortcuts',
  WEATHER: 'Weather',
} as const

export const WIDGETS = {
  GUARDIANIDEAL: {
    title: 'Guardian Ideal',
    type: WIDGET_TYPES.GUARDIANIDEAL,
  },
  FEATUREDSHORTCUTS: {
    title: 'Featured Shortcuts',
    type: WIDGET_TYPES.FEATUREDSHORTCUTS,
  },
}

export const MAXIMUM_COLLECTIONS = 25

export const EXAMPLE_COLLECTION_ID = 'ckwz3u58s1835ql974leo1yll'

export const CONTENT_CATEGORIES = {
  EXTERNAL_NEWS: {
    value: 'ExternalNews',
    label: 'External USSF News',
  },
  INTERNAL_NEWS: {
    value: 'InternalNews',
    label: 'Internal USSF News',
  },
  NEWS: {
    value: 'News',
    label: 'USSF News',
  },
  ANNOUNCEMENT: {
    value: 'Announcement',
    label: 'Announcement',
  },
  DOCUMENTATION: {
    value: 'Documentation',
    label: 'USSF Documentation',
  },
  LANDING_PAGE: {
    value: 'LandingPage',
    label: 'Landing Page',
  },
  APPLICATION: {
    value: 'Application',
    label: 'Application',
  },
  GUARDIANIDEAL: {
    value: 'GuardianIdeal',
    label: 'Guardian Ideal',
  },
  FEATUREDSHORTCUTS: {
    value: 'FeaturedShortcuts',
    label: 'FeaturedShortcuts',
  },
} as const

/**
 * (for later, this is the last digit of fascn number)
 * 
 * Person categories
1 – Employee
2 – Civil
3 – Executive Staff
4 – Uniformed Service
5 – Contractor
6 – Organization Affiliate
7 – Organization Beneficiary
 */
