import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

import passport from '../../../lib/passport'
import { configSaml } from '../../../lib/saml'
import type { LogoutRequest } from '../../../lib/saml'

// TODO - store a session
const emptyUser = { nameID: '', nameIDFormat: '' }
let SESSION_USER = emptyUser

/**
 * /api/auth/[[...action]] handler
 *
 * GET /api/auth/login - initiate a SAML request
 * POST /api/auth/login - callback URL for IdP SSO
 * GET /api/auth/logout - initiate a SLO (logout) request
 * GET /api/auth/logout/callback - callback URL for IdP SLO
 */
export default nextConnect<NextApiRequest, NextApiResponse>()
  .use(async (req, res, next) => {
    await configSaml(passport)
    next()
  })
  .use(passport.initialize())
  .get('/api/auth/login', passport.authenticate('saml'))
  .post('/api/auth/login', (req, res) => {
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
        console.error('Error missing user in SAML response', err)
        res.redirect('/login')
      }

      console.log('got user', user)

      // TODO - set user in session & redirect
      SESSION_USER = user
      res.send(
        `Logged in as user: ${user.edipi} ${user.userprincipalname} ${user['iv-groups']}`
      )
    })(req, res)
  })
  .get('/api/auth/logout', (req, res) => {
    // Modify the NextApiRequest to include user attributes required by SLO
    const logoutRequest = req as LogoutRequest
    logoutRequest.user = {
      nameID: SESSION_USER.nameID,
      nameIDFormat: SESSION_USER.nameIDFormat,
    }

    passport.logoutSaml(logoutRequest, (err, request) => {
      if (!err && request) {
        // TODO - POST not Redirect
        res.redirect(request)
      } else if (err) {
        // TODO - error handling
        // eslint-disable-next-line no-console
        console.error('Error initiating SLO request', err)
      } else {
        // TODO - error handling
        // eslint-disable-next-line no-console
        console.error('Error initiating SLO request, missing request URL')
      }
    })
  })
  .get('/api/auth/logout/callback', (req, res) => {
    console.log('get logout callback')
    // TODO - clear session & redirect
    SESSION_USER = emptyUser
    res.send('User logged out!')
  })
  .post('/api/auth/logout/callback', (req, res) => {
    console.log('post logout callback')
    // TODO - clear session & redirect
    SESSION_USER = emptyUser
    res.send('User logged out!')
  })
