import { NextApiRequest, NextApiResponse } from 'next'

// These values are defined by Webpack during the build step
declare const __VERSION__: string
declare const __BUILD_ID__: string
declare const __NODE_ENV__: string

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    version: __VERSION__,
    buildId: __BUILD_ID__,
    nodeEnv: __NODE_ENV__,
    cmsUrl: process.env.KEYSTONE_URL,
    analyticsUrl: process.env.MATOMO_URL,
    analyticsSiteId: process.env.MATOMO_SITE_ID,
  })
}
