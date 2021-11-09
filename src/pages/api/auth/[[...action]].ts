import NextConnect from 'next-connect'
import { NextApiResponse } from 'next'
import type * as express from 'express'

import passport from '../../../lib/passport'
import session from '../../../lib/session'
import { configSaml } from '../../../lib/saml'

import type { SAMLUser } from 'types'

/************************************/
/*  /api/auth/[[...action]] handler */
/************************************/

interface PassportRequest extends express.Request {
  user?: SAMLUser
}

const handler = NextConnect<PassportRequest, NextApiResponse>()

handler
  .use(session)
  .use(async (req, res, next) => {
    // This needs to await to ensure we have SAML metadata before proceeding
    // Otherwise Passport won't initialize the strategy
    await configSaml(passport)
    next()
  })
  .use(passport.initialize())
  .use(passport.session())

// GET /api/auth/user - check for logged in user
handler.get('/api/auth/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user })
  } else {
    res.json({ user: null })
  }
})

// GET /api/auth/login - initiate a SAML request
handler.get('/api/auth/login', passport.authenticate('saml'))

// POST /api/auth/login - callback URL for IdP SSO
handler.post('/api/auth/login', (req, res) => {
  passport.authenticate('saml', function (err, user) {
    if (err) {
      // TODO - error handling
      // eslint-disable-next-line no-console
      console.error('Error authenticating with SAML', err)
      res.redirect('/login')
    }

    if (!user) {
      // TODO - error handling
      // eslint-disable-next-line no-console
      console.error('Error - missing user in SAML response', err)
      res.redirect('/login')
    }

    req.login(user, (err) => {
      if (err) {
        // TODO - error handling
        // eslint-disable-next-line no-console
        console.error('Error logging user into Passport', err)
        return res.redirect('/login')
      }

      return res.redirect('/')
    })
  })(req, res)
})

//  GET /api/auth/logout - initiate a SLO (logout) request
handler.get('/api/auth/logout', (req, res) => {
  if (!req.user) {
    // Not logged in
    req.session.destroy(() => {
      res.redirect('/login')
    })
  } else {
    passport.logoutSaml(req, (err, request) => {
      if (!err && request) {
        req.session.destroy(() => {
          res.redirect(request)
        })
      } else if (err) {
        // TODO - error handling
        // eslint-disable-next-line no-console
        console.error('Error initiating SLO request', err)
        req.session.destroy(() => {
          res.redirect('/login')
        })
      } else {
        // TODO - error handling
        // eslint-disable-next-line no-console
        console.error('Error initiating SLO request, missing request URL')
        req.session.destroy(() => {
          res.redirect('/login')
        })
      }
    })
  }
})

// GET /api/auth/logout/callback - callback URL for IdP SLO
handler.get('/api/auth/logout/callback', (req, res) => {
  if (req.user) {
    req.session.destroy(() => {
      res.redirect('/login')
    })
  } else {
    res.redirect('/login')
  }
})

export default handler
