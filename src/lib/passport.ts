import passport from 'passport' // This is the only file that should import passport

import { configSaml, User, PassportWithLogout } from './saml'

// Configure Passport & SAML
const passportWithLogout = passport as PassportWithLogout

// Used for saving/retreiving user in session
// see: https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passportWithLogout.serializeUser((user, done) => {
  done(null, user)
})

passportWithLogout.deserializeUser((user, done) => {
  done(null, user as User)
})

configSaml(passportWithLogout)

export default passportWithLogout
