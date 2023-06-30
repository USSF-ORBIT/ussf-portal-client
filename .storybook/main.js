const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    'storybook-addon-apollo-client',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-theme-toggle',
    'storybook-addon-mock',
    'storybook-addon-launchdarkly',
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfig: path.resolve(__dirname, '../tsconfig.json'),
    },
  },
  staticDirs: ['../public'],

  webpackFinal: async (config) => {
    config.resolve.alias.uswds = path.resolve(
      __dirname,
      '../node_modules/@uswds/uswds/packages'
    )
    config.resolve.modules = config.resolve.modules || []
    config.resolve.modules.push(path.resolve(__dirname, '../src'))
    config.resolve.modules.push('node_modules')

    return config
  },

  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

  docs: {
    autodocs: 'tag',
  },
}
