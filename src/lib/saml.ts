import { PassportStatic } from 'passport'
import { Strategy as SamlStrategy, Profile } from 'passport-saml'
import { fetch, toPassportConfig } from 'passport-saml-metadata'
import { NextApiRequest } from 'next'
import type * as express from 'express'

/** Types */

// This represents the data we'll get back from the SAML response
// Refine this as we validate the response
type User = Record<string, string>

// from: https://github.com/node-saml/passport-saml/blob/master/src/types.ts#L19
// This is the type expected by samlStrategy.logout but it is unclear why
// samlLogoutRequest is not used in the code, so passed in as null
// maybe related but unsolved issue: https://github.com/node-saml/passport-saml/issues/549
interface RequestWithUser extends express.Request {
  samlLogoutRequest: any
  user?: Profile
}

// The type of the request we're actually sending to samlStrategy.logout
// The request + user.nameID, user.nameIDFormat attributes
// ref: https://stackoverflow.com/questions/25271072/logging-out-using-passport-saml-req-logout-or-strategy-logout-or-both
export type LogoutRequest = NextApiRequest & {
  user: User & {
    nameID: string
    nameIDFormat: string
  }
}

// Wider Passport type so we can add our own logout method to it
export type PassportWithLogout = PassportStatic & {
  logoutSaml: (
    req: LogoutRequest,
    callback: (err: Error | null, url?: string | null | undefined) => void
  ) => void
}

// TODO - get this value from C1
const ISSUER = 'ussf-portal-client'

// TODO - move into env
const IDP_METADATA = 'http://localhost:8080/simplesaml/saml2/idp/metadata.php'

/** Service Provider config */
const samlConfig = {
  path: '/api/auth/login',
  logoutCallbackUrl: '/api/auth/logout/callback',
  issuer: ISSUER,
  audience: ISSUER,
  disableRequestedAuthnContext: true, // for ADFS - https://github.com/node-saml/passport-saml/issues/226
  authnRequestBinding: 'HTTP-Redirect', // default, or: 'HTTP-POST'

  // passport config
  passReqToCallback: true,
}

/** Configure Passport + SAML */
export const configSaml = (passport: PassportWithLogout) => {
  fetch({ url: IDP_METADATA })
    .then((reader) => {
      const strategyConfig = {
        ...toPassportConfig(reader),
        ...samlConfig,
      }

      const samlStrategy = new SamlStrategy(strategyConfig, function (
        req,
        profile,
        done
      ) {
        // Verify the response & user here
        return done(null, profile as User)
      })

      passport.use(samlStrategy)

      passport.logoutSaml = function (req, done) {
        const samlRequest = {
          ...req,
          samlLogoutRequest: null,
        } as unknown as RequestWithUser

        samlStrategy.logout(samlRequest, done)
      }

      // Used for saving/retreiving user in session
      // see: https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
      passport.serializeUser((user, done) => {
        done(null, user)
      })

      passport.deserializeUser((user, done) => {
        done(null, user as User)
      })
    })
    .catch((err) => {
      // TODO - log error
      // eslint-disable-next-line no-console
      console.error('Error loading SAML metadata', err)
      process.exit(1)
    })
}
