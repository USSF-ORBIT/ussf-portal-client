const { RemoteBrowserTarget } = require('happo.io')
const happoPluginStorybook = require('happo-plugin-storybook')

module.exports = {
  apiKey: process.env.HAPPO_API_KEY,
  apiSecret: process.env.HAPPO_API_SECRET,
  targets: {
    chrome: new RemoteBrowserTarget('chrome', {
      viewport: '1024x768',
    }),
  },
  plugins: [
    happoPluginStorybook({
      outputDir: 'storybook-static',
    }),
  ],
}
