import { RouterContext } from 'next/dist/shared/lib/router-context'
import * as NextImage from 'next/image'
import { MockedProvider } from '@apollo/client/testing'

import '../src/initIcons'
import '../src/styles/index.scss'
// SFDS
import '../src/styles/sfds/index.scss'

// Storybook and next/image component do not play nice together
// This enables us to use the <Image/> component and still view in Storybook
const OriginalNextImage = NextImage.default
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})

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
  apolloClient: {
    MockedProvider,
  },
  viewport: {
    viewports: SFDS_VIEWPORTS,
  },
}
