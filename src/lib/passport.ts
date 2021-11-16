import passport from 'passport' // This is the only file that should import passport

import { PassportWithLogout } from './saml'

import type { SAMLUser } from 'types'

const passportWithLogout = passport as PassportWithLogout

// Used for saving/retreiving user in session
// see: https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passportWithLogout.serializeUser((user, done) => {
  // console.log('serialize user', user)
  done(null, user)
})

passportWithLogout.deserializeUser((user, done) => {
  // console.log('deserialize user', user)
  done(null, user as SAMLUser)
})

export default passportWithLogout
