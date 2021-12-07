import passport from 'passport' // This is the only file that should import passport

import { PassportWithLogout } from './saml'

import type { SAMLUser } from 'types'

const passportWithLogout = passport as PassportWithLogout

// Used for saving/retreiving user in session
// see: https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passportWithLogout.serializeUser((user, done) => {
  // TODO - set an ID property on user here?
  done(null, user)
})

passportWithLogout.deserializeUser((user, done) => {
  done(null, user as SAMLUser)
})

export default passportWithLogout
