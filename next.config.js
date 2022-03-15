/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack')

const { withKeystone } = require('@keystone-next/keystone/next')

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]

module.exports = withKeystone(
  withBundleAnalyzer({
    webpack: (config, { buildId }) => {
      config.plugins.push(
        new webpack.DefinePlugin({
          __VERSION__: JSON.stringify(process.env.npm_package_version),
          __BUILD_ID__: JSON.stringify(buildId),
          __NODE_ENV__: JSON.stringify(process.env.NODE_ENV),
        })
      )

      return config
    },
    generateBuildId: async () => {
      return process.env.IMAGE_TAG
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
    async redirects() {
      return [
        {
          source: '/',
          has: [
            {
              type: 'header',
              key: 'User-Agent',
              value: '(.*Trident.*)',
            },
          ],
          permanent: false,
          destination: '/update-browser',
        },
        // Beta URLs - deprecate
        {
          source: '/joinbeta',
          destination: '/',
          permanent: true,
        },
        {
          source: '/leavebeta',
          destination: '/',
          permanent: true,
        },
        // MVP pages - marked for deletion
        {
          source: '/about-us/accomplishments',
          destination: '/404',
          permanent: false,
        },
        {
          source: '/training-and-education',
          destination: '/404',
          permanent: false,
        },
        {
          source: '/training-and-education/force-multiplier-program',
          destination: '/404',
          permanent: false,
        },
      ]
    },
    async rewrites() {
      return {
        beforeFiles: [
          {
            source: '/sites-and-applications',
            destination: '/beta/sites-and-applications',
          },
          {
            source: '/news',
            destination: '/beta/news',
          },
          {
            source: '/about-us',
            destination: '/beta/about-us',
          },
          {
            source: '/',
            destination: '/beta',
          },
        ],
      }
    },
  })
)
