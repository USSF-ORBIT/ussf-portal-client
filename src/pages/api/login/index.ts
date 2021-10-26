import passport from 'passport'
import nextConnect from 'next-connect'

import { samlStrategy } from '../../../lib/saml'

passport.use(samlStrategy)

export default nextConnect()
  .use(passport.initialize())
  .get(passport.authenticate('saml'))
  .post(passport.authenticate('saml'))
