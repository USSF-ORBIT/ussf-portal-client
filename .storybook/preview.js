import { RouterContext } from 'next/dist/shared/lib/router-context'
import * as NextImage from 'next/image'
import { MockedProvider } from '@apollo/client/testing'
import '../src/initIcons'
import '../src/styles/index.scss'

// Storybook and next/image component do not play nice together
// This enables us to use the <Image/> component and still view in Storybook
const OriginalNextImage = NextImage.default
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})

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
}
