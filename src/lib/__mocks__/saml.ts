import { Strategy } from 'passport-custom'

import type { PassportWithLogout } from '../saml'

import type { SAMLUser } from 'types'

export const mockUser = {
  attributes: {
    edipi: '1234567890',
    givenname: 'Test',
    sans: 'msupn:1234567890@mil',
    surname: 'User',
    userprincipalname: 'TEST.USER.1234567890@testusers.cce.af.mil',
    ivgroups: 'AFIN_TRANSIT,AF_USERS',
  },
}

export const configSaml = async (passport: PassportWithLogout) => {
  const mockSamlStrategy = new Strategy(function (req, done) {
    // Verify the response & user here
    return done(null, mockUser as SAMLUser)
  })

  passport.use('saml', mockSamlStrategy)

  passport.logoutSaml = jest.fn((req, done) => {
    done(null, 'mock SLO request URL')
  })
}
