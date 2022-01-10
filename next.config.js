/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const { withKeystone } = require('@keystone-next/keystone/next')

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]

module.exports = withKeystone(
  withBundleAnalyzer({
    serverRuntimeConfig: {
      testSecret: 'testSecretValue',
      MATOMO_URL: process.env.MATOMO_URL,
      MATOMO_SITE_ID: process.env.MATOMO_SITE_ID,
    },
    publicRuntimeConfig: {
      testPublic: 'testPublicValue',
      MATOMO_URL: process.env.MATOMO_URL,
      MATOMO_SITE_ID: process.env.MATOMO_SITE_ID,
    },
    reactStrictMode: true,
    // swcMinify: true,
    async headers() {
      return [
        {
          // Apply these headers to all routes
          source: '/(.*)',
          headers: securityHeaders,
        },
      ]
    },
    async rewrites() {
      return {
        beforeFiles: [
          {
            source: '/sites-and-applications',
            has: [
              {
                type: 'cookie',
                key: 'betaOptIn',
                value: 'true',
              },
            ],
            destination: '/beta/sites-and-applications',
          },
          {
            source: '/leavebeta',
            has: [
              {
                type: 'cookie',
                key: 'betaOptIn',
                value: 'true',
              },
            ],
            destination: '/beta/leavebeta',
          },
          {
            source: '/',
            has: [
              {
                type: 'cookie',
                key: 'betaOptIn',
                value: 'true',
              },
            ],
            destination: '/beta',
          },
        ],
      }
    },
  })
)
