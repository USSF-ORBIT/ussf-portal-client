import passport from 'passport'
import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

import { samlStrategy } from '../../../lib/saml'

passport.serializeUser(function (user, done) {
  console.log('-----------------------------')
  console.log('serialize user')
  console.log(user)
  console.log('-----------------------------')
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  console.log('-----------------------------')
  console.log('deserialize user')
  console.log(user)
  console.log('-----------------------------')
  done(null, user as any)
})

passport.use(samlStrategy)

export default nextConnect<NextApiRequest, NextApiResponse>()
  .use(passport.initialize())
  .get(passport.authenticate('saml'))
  .post((req, res) => {
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
