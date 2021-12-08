import { Strategy } from 'passport-custom'

import type { PassportWithLogout } from '../saml'
import { testUser1 } from '../../__fixtures__/authUsers'

export const mockUser = testUser1

export const configSaml = async (passport: PassportWithLogout) => {
  const mockSamlStrategy = new Strategy(function (req, done) {
    // Verify the response & user here
    return done(null, mockUser)
  })

  passport.use('saml', mockSamlStrategy)

  passport.logoutSaml = jest.fn((req, done) => {
    done(null, 'mock SLO request URL')
  })
}
