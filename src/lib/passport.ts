import passport from 'passport' // This is the only file that should import passport

import { PassportWithLogout } from './saml'

import type { SessionUser } from 'types'

const passportWithLogout = passport as PassportWithLogout

// Used for saving/retreiving user in session
// see: https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passportWithLogout.serializeUser((user, done) => {
  done(null, user)
})

passportWithLogout.deserializeUser((user, done) => {
  done(null, user as SessionUser)
})

export default passportWithLogout
