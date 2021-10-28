import passport from 'passport'
import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

import {
  configSaml,
  PassportWithLogout,
  LogoutRequest,
} from '../../../lib/saml'

const passportWithLogout = passport as PassportWithLogout

configSaml(passportWithLogout)

// TODO - store a session
const emptyUser = { nameID: '', nameIDFormat: '' }
let SESSION_USER = emptyUser

export default nextConnect<NextApiRequest, NextApiResponse>({
  attachParams: true,
})
  .use(passportWithLogout.initialize())
  .get('/api/auth/login', passportWithLogout.authenticate('saml'))
  .post('/api/auth/login', (req, res) => {
    passportWithLogout.authenticate('saml', function (err, user, info) {
      if (err) {
        console.log('error')
        res.redirect('/login')
      }
      if (!user) {
        console.log('no user')
        res.redirect('/login')
      }

      console.log('got user', user)

      SESSION_USER = user

      res.send(
        `Logged in as user: ${user.edipi} ${user.userprincipalname} ${user['iv-groups']}`
      )
    })(req, res)
  })
  .get('/api/auth/logout', (req, res) => {
    console.log('Log out from', SESSION_USER)

    const logoutRequest = req as LogoutRequest
    logoutRequest.user = {
      nameID: SESSION_USER.nameID,
      nameIDFormat: SESSION_USER.nameIDFormat,
    }

    passportWithLogout.logoutSaml(logoutRequest, (err, request) => {
      console.log('init SAML logout', request)
      if (!err && request) {
        res.redirect(request)
      } else {
        console.log('logout error', err)
      }
    })
  })
  .get('/api/auth/logout/callback', (req, res) => {
    console.log('logout callback')

    // TODO - clear session
    SESSION_USER = emptyUser

    res.redirect('/login')
  })
