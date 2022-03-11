import NextConnect from 'next-connect'
import { NextApiResponse } from 'next'
import axios from 'axios'
import Cors from 'cors'

import passport from '../../../lib/passport'
import session from '../../../lib/session'
import { configSaml, PassportRequest } from '../../../lib/saml'

/************************************/
/*  /api/auth/[[...action]] handler */
/************************************/

const handler = NextConnect<PassportRequest, NextApiResponse>({
  onError: (err, req, res) => {
    /* eslint-disable no-console */
    console.error('Error in authentication')
    console.error(err)
    console.error(err.stack)
    /* eslint-enable no-console */
    res.status(500).end('Error authenticating')
  },
})

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
    res.status(401).json({ user: null })
  }
})

// GET /api/auth/login - initiate a SAML request
handler.get('/api/auth/login', passport.authenticate('saml'))

// POST /api/auth/login - callback URL for IdP SSO
handler.post(
  '/api/auth/login',
  passport.authenticate('saml', {
    failureRedirect: '/login',
    failureMessage: true,
  }),
  function (req, res) {
    // Login was successful, redirect back home
    res.redirect(302, '/')
  }
)

const cors = Cors({
  methods: ['GET', 'HEAD'],
  // origin: process.env.KEYSTONE_URL,
})

function runCors(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

//  GET /api/auth/logout - initiate a SLO (logout) request
handler.get('/api/auth/logout', async (req, res) => {
  await runCors(req, res, cors)

  if (!req.user) {
    // Not logged in
    await req.session.destroy()
    res.redirect(302, '/login')
  } else {
    await req.session.destroy()

    passport.logoutSaml(req, (err, logoutRequest) => {
      if (!err && logoutRequest) {
        // TEMPORARY - DEVELOPMENT ONLY
        // because our test IDP does not support SLO HTTP-POST bindings
        if (
          process.env.SAML_IDP_METADATA_URL ===
            'http://idp:8080/simplesaml/saml2/idp/metadata.php' ||
          process.env.SAML_IDP_METADATA_URL ===
            'http://localhost:8080/simplesaml/saml2/idp/metadata.php'
        ) {
          res.redirect(logoutRequest)
        } else {
          // POST to the SLO URL
          axios.post(logoutRequest).then(() => {
            res.redirect(302, '/login')
          })
        }
      } else if (err) {
        // TODO - error handling
        // eslint-disable-next-line no-console
        console.error('Error initiating SLO request', err)
        res.status(500).end()
      } else {
        // TODO - error handling
        // eslint-disable-next-line no-console
        console.error('Error initiating SLO request, missing request URL')
        res.status(500).end()
      }
    })
  }
})

// GET /api/auth/logout/callback - callback URL for IdP SLO
handler.get('/api/auth/logout/callback', async (req, res) => {
  // TODO - may need to handle redirect
  res.redirect(302, '/login')
})

export default handler
