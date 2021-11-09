import NextConnect from 'next-connect'
import { NextApiResponse } from 'next'

import passport from '../../../lib/passport'
import session from '../../../lib/session'
import { configSaml, PassportRequest } from '../../../lib/saml'

/************************************/
/*  /api/auth/[[...action]] handler */
/************************************/

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
handler.get('/api/auth/logout', async (req, res) => {
  if (!req.user) {
    // Not logged in
    await req.session.destroy()
    res.redirect('/login')
  } else {
    await req.session.destroy()

    passport.logoutSaml(req, async (err, logoutRequest) => {
      if (!err && logoutRequest) {
        res.redirect(logoutRequest)
      } else if (err) {
        // TODO - error handling
        // eslint-disable-next-line no-console
        console.error('Error initiating SLO request', err)
        res.redirect('/login')
      } else {
        // TODO - error handling
        // eslint-disable-next-line no-console
        console.error('Error initiating SLO request, missing request URL')
        res.redirect('/login')
      }
    })
  }
})

// GET /api/auth/logout/callback - callback URL for IdP SLO
handler.get('/api/auth/logout/callback', (req, res) => {
  res.redirect('/login')
})

export default handler
