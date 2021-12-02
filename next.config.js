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
            source: '/:path',
            has: [
              {
                type: 'cookie',
                key: 'betaOptIn',
                value: 'true',
              },
            ],
            destination: '/beta/:path',
          },
          {
            source: '/training-and-education/:path*',
            has: [
              {
                type: 'cookie',
                key: 'betaOptIn',
                value: 'true',
              },
            ],
            destination: '/beta/training-and-education/:path*',
          },
          {
            source: '/about-us/:path*',
            has: [
              {
                type: 'cookie',
                key: 'betaOptIn',
                value: 'true',
              },
            ],
            destination: '/beta/about-us/:path*',
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
