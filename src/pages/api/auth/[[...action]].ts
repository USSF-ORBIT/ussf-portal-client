import passport from 'passport'
import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
// import { Strategy as SamlStrategy } from 'passport-saml'

import { configSaml } from '../../../lib/saml'

configSaml(passport)

export default nextConnect<NextApiRequest, NextApiResponse>({
  attachParams: true,
})
  .use(passport.initialize())
  .get('/api/auth/login', passport.authenticate('saml'))
  .post('/api/auth/login', (req, res) => {
    passport.authenticate('saml', function (err, user, info) {
      if (err) {
        console.log('error')
        res.redirect('/login')
      }
      if (!user) {
        console.log('no user')
        res.redirect('/login')
      }

      console.log('got user', user)
      res.send(
        `Logged in as user: ${user.edipi} ${user.userprincipalname} ${user['iv-groups']}`
      )
    })(req, res)
  })
  .get('/api/auth/logout', (req, res) => {
    console.log('Logged out')
    res.send(`User logged out`)
  })
/*
  .get('/api/auth/metadata', (req, res) => {
    res.type('application/xml')
    res.status(200).send(generate)
  })
  */
