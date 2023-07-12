import { RouterContext } from 'next/dist/shared/lib/router-context'
import { MockedProvider } from '@apollo/client/testing'

// happo support
import 'happo-plugin-storybook/register'

// SFDS
import 'styles/index.scss'
import 'initIcons'

const SFDS_VIEWPORTS = {
  mobile: {
    name: 'Mobile (small)',
    styles: {
      width: '320px',
      height: '568px',
    },
    type: 'mobile',
  },
  mobileLg: {
    name: 'Mobile (large)',
    styles: {
      height: '896px',
      width: '767px',
    },
    type: 'mobile',
  },
  tablet: {
    name: 'Tablet (small)',
    styles: {
      height: '896px',
      width: '768px',
    },
    type: 'tablet',
  },
  tabletLg: {
    name: 'Tablet (large)',
    styles: {
      height: '896px',
      width: '1199px',
    },
    type: 'tablet',
  },
  laptop: {
    name: 'Laptop (small)',
    styles: {
      height: '896px',
      width: '1200px',
    },
    type: 'desktop',
  },
  laptopLg: {
    name: 'Laptop (large)',
    styles: {
      height: '896px',
      width: '1439px',
    },
    type: 'desktop',
  },
  desktop: {
    name: 'Desktop (small)',
    styles: {
      height: '896px',
      width: '1440px',
    },
    type: 'desktop',
  },
  desktopLg: {
    name: 'Desktop (large)',
    styles: {
      height: '896px',
      width: '2559',
    },
    type: 'desktop',
  },
  widescreen: {
    name: 'Widescreen',
    styles: {
      height: '896px',
      width: '2560',
    },
    type: 'desktop',
  },
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  options: {
    storySort: {
      order: [
        'Welcome',
        'USSF Design System',
        'Global',
        'Navigation',
        'Base',
        'Components',
        'Layout',
      ],
    },
  },
  apolloClient: {
    MockedProvider,
  },
  viewport: {
    viewports: SFDS_VIEWPORTS,
  },
  backgrounds: {
    default: '#d9e8f6',
    values: [
      {
        name: 'dark',
        value: '#0f305a',
      },
      {
        name: 'white',
        value: '#FFFFFF',
      },
    ],
  },
}
