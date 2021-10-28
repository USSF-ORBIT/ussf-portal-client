import passport from 'passport'
import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

import {
  configSaml,
  PassportWithLogout,
  LogoutRequest,
} from '../../../lib/saml'

// Configure Passport & SAML
const passportWithLogout = passport as PassportWithLogout
configSaml(passportWithLogout)

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
  .use(passportWithLogout.initialize())
  .get('/api/auth/login', passportWithLogout.authenticate('saml'))
  .post('/api/auth/login', (req, res) => {
    passportWithLogout.authenticate('saml', function (err, user) {
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

    passportWithLogout.logoutSaml(logoutRequest, (err, request) => {
      if (!err && request) {
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
    // TODO - clear session & redirect
    SESSION_USER = emptyUser
    res.send('User logged out!')
  })
