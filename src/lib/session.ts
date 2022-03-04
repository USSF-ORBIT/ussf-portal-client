import { NextApiRequest, NextApiResponse } from 'next'
import { Middleware } from 'next-connect'
import nextSession from 'next-session'
import RedisStoreFactory from 'connect-redis'
import { expressSession, promisifyStore } from 'next-session/lib/compat'
import { sign, unsign } from 'cookie-signature'

import redis from './redis'

const RedisStore = RedisStoreFactory(expressSession)

const SESSION_SECRET = process.env.SESSION_SECRET || ''
const SESSION_EXPIRATION = 60 * 60 * 4 // 4 hours
const SESSION_DOMAIN = 'localhost' // TODO env var

export const getSession = nextSession({
  store: promisifyStore(new RedisStore({ client: redis })),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_EXPIRATION,
    sameSite: 'strict',
    domain: SESSION_DOMAIN,
  },
  encode: (sid) => sign(sid, SESSION_SECRET),
  decode: (raw) => unsign(raw, SESSION_SECRET) || null,
})

const session: Middleware<NextApiRequest, NextApiResponse> = async (
  req,
  res,
  next
) => {
  try {
    await getSession(req, res)
    next()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error getting session', e)
    throw e
  }
}

export default session
