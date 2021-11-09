import { NextApiRequest, NextApiResponse } from 'next'
import { Middleware } from 'next-connect'
import nextSession from 'next-session'
import RedisStoreFactory from 'connect-redis'
import { expressSession, promisifyStore } from 'next-session/lib/compat'

import redis from './redis'

const RedisStore = RedisStoreFactory(expressSession)

const getSession = nextSession({
  store: promisifyStore(new RedisStore({ client: redis })),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 2 * 7 * 24 * 60 * 60, // 2 weeks
    sameSite: 'strict',
  },
})

const session: Middleware<NextApiRequest, NextApiResponse> = async (
  req,
  res,
  next
) => {
  await getSession(req, res)
  next()
}

export default session
