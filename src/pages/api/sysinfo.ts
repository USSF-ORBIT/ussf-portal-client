import { NextApiRequest, NextApiResponse } from 'next'

// These values are defined by Webpack during the build step
declare const __VERSION__: string
// This is the NextJS Build ID not to be confused with our git sha
// The git sha is what our build fills into the environment variable BUILD_ID
declare const __NEXT_BUILD_ID__: string
declare const __NODE_ENV__: string

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    version: __VERSION__,
    nextBuildId: __NEXT_BUILD_ID__,
    nodeEnv: __NODE_ENV__,
    // See note above
    buildId: process.env.BUILD_ID,
    analyticsUrl: process.env.MATOMO_URL,
    analyticsSiteId: process.env.MATOMO_SITE_ID,
    keystoneUrl: process.env.KEYSTONE_URL,
    // keystonePublicUrl: process.env.KEYSTONE_PUBLIC_URL,
    clientSideID: process.env.LAUNCHDARKLY_SDK_CLIENT_SIDE_ID,
    personnelApiUrl: process.env.PERSONNEL_API_URL,
  })
}
