const path = require('path')

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-css-modules-preset',
    'storybook-addon-next-router',
    'storybook-addon-apollo-client',
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
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',

        // All CSS assets will be served from /public so no need to resolve URLs
        { loader: 'css-loader', options: { url: false } },

        { loader: 'sass-loader', options: { warnRuleAsWarning: false } },
      ],
    })

    config.resolve.modules = config.resolve.modules || []
    config.resolve.modules.push(path.resolve(__dirname, '../src'))
    config.resolve.modules.push('node_modules')

    // Return the altered config
    return config
  },
}
