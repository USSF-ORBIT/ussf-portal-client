// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPlugins = require('next-compose-plugins')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withPlugins(
  [withBundleAnalyzer], // All next plugins go here
  {
    i18n: {
      locales: ['en-US'],
      defaultLocale: 'en-US',
    },
  }
)
