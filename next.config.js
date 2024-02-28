/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack')

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]

module.exports = withBundleAnalyzer({
  sassOptions: {
    includePaths: ['./node_modules/@uswds/uswds/packages'],
  },
  webpack: (config, { isServer, buildId }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(process.env.npm_package_version),
        __NEXT_BUILD_ID__: JSON.stringify(buildId),
        __NODE_ENV__: JSON.stringify(process.env.NODE_ENV),
      })
    )

    if (isServer) {
      config.externals = ['react', ...config.externals]
    }

    config.resolve.alias['react'] = path.resolve(
      __dirname,
      '.',
      'node_modules',
      'react'
    )

    return config
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
    ]
  },
})
