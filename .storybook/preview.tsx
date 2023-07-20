import React from 'react'
import { Preview } from '@storybook/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { MockedProvider } from '@apollo/client/testing'
import { ThemeProvider } from 'next-themes'
import { UPDATE_GLOBALS, GLOBALS_UPDATED } from '@storybook/core-events'

// happo support
import { setThemeSwitcher } from 'happo-plugin-storybook/register'

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

const preview: Preview = {
  parameters: {
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
    happo: {
      themes: ['light', 'dark'],
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { title: 'Light Mode', value: 'light' },
          { title: 'Dark Mode', value: 'dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, { globals: { theme } }) => {
      return (
        <ThemeProvider
          forcedTheme={theme}
          enableSystem={false}
          attribute={'data-color-theme'}>
          <Story />
        </ThemeProvider>
      )
    },
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
}

setThemeSwitcher((theme: string, channel: any) => {
  return new Promise((resolve) => {
    // Listen for global to be updated and resolve.
    channel.once(GLOBALS_UPDATED, resolve)
    // Emit event to update the global theme setting
    channel.emit(UPDATE_GLOBALS, {
      globals: { theme },
    })
  })
})

export default preview
