import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    version: process.env.npm_package_version,
    buildId: process.env.BUILD_ID,
    nodeEnv: process.env.NODE_ENV,
  })
}
