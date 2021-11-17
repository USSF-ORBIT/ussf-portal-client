import { execSync } from 'child_process'
import { NextApiRequest, NextApiResponse } from 'next'
import packageInfo from '../../../package.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    version: packageInfo.version,
    nodeEnv: process.env.NODE_ENV,
    commit: getGitCommitHash(),
  })
}

function getGitCommitHash() {
  const gitCommand = 'git rev-parse HEAD'

  if (process.env.NODE_ENV === 'development') {
    return execSync(gitCommand).toString().trim()
  }

  if (process.env.NODE_ENV === 'production') {
    // todo set env for sha
    return ''
  }

  return ''
}
