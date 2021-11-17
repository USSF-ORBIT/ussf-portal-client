import { NextApiRequest, NextApiResponse } from 'next'
import { Middleware } from 'next-connect'
import nextSession from 'next-session'

// Mock in-memory session for Jest tests

const getSession = nextSession({
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
