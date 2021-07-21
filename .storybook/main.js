const path = require('path')
module.exports = {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-css-modules-preset',
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',

        // All CSS assets will be served from /public so no need to resolve URLs
        { loader: 'css-loader', options: { url: false } },

        'sass-loader',
      ],
    }),
      (config.resolve.modules = [
        path.resolve(__dirname, '../src'),
        'node_modules',
      ])
    // Return the altered config
    return config
  },
}
