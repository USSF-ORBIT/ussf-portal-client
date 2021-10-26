/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const { withKeystone } = require('@keystone-next/keystone/next')

module.exports = withKeystone(
  withBundleAnalyzer({
    experimental: { outputFileTracing: true }, // in order to use fs to read certs
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
