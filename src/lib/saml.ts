import type { PassportStatic } from 'passport'
import { Strategy as SamlStrategy, Profile, SamlConfig } from 'passport-saml'
import { fetch, toPassportConfig } from 'passport-saml-metadata'
import type { NextApiRequest } from 'next'
import type * as express from 'express'

// TEMPORARY
// import cert from '../../certs/gcds_workaround'

/** Types */

// This represents the data we'll get back from the SAML response
// Refine this as we validate the response
export type User = Record<string, string>

// from: https://github.com/node-saml/passport-saml/blob/master/src/types.ts#L19
// This is the type expected by samlStrategy.logout but it is unclear why
// samlLogoutRequest is not used in the code, so passed in as null
// maybe related but unsolved issue: https://github.com/node-saml/passport-saml/issues/549
export interface RequestWithUser extends express.Request {
  samlLogoutRequest: unknown
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

const ISSUER = process.env.SAML_ISSUER
const IDP_METADATA = process.env.SAML_IDP_METADATA_URL

/** Service Provider config */
const samlConfig = {
  path: '/api/auth/login',
  logoutCallbackUrl: '/api/auth/logout/callback',
  issuer: ISSUER,
  // audience: ISSUER,
  disableRequestedAuthnContext: true, // for ADFS - https://github.com/node-saml/passport-saml/issues/226
  authnRequestBinding: 'HTTP-Redirect', // default, or: 'HTTP-POST'
  wantAssertionsSigned: false,
  // passport config
  passReqToCallback: true,
  // signatureAlgorithm: 'sha256',
  // digestAlgorithm: 'sha256',
  // cert, // temporary
}

/** Configure Passport + SAML */
export const configSaml = async (passport: PassportWithLogout) => {
  if (!IDP_METADATA) {
    // TODO - assert this on server start
    throw new Error('Error: no IdP metadata URL provided!')
  }

  try {
    const reader = await fetch({ url: IDP_METADATA })

    const strategyConfig: SamlConfig & { identityProviderUrl?: string } = {
      ...toPassportConfig(reader, { multipleCerts: true }),
      ...samlConfig,
    }

    console.log('got metadata!', strategyConfig)

    // DEVELOPMENT ONLY
    if (IDP_METADATA === 'http://idp:8080/simplesaml/saml2/idp/metadata.php') {
      // rewrite docker network hostnames to localhost
      strategyConfig.identityProviderUrl =
        strategyConfig.identityProviderUrl?.replace(
          'idp:8080',
          'localhost:8080'
        )
      strategyConfig.entryPoint = strategyConfig.entryPoint?.replace(
        'idp:8080',
        'localhost:8080'
      )
      strategyConfig.logoutUrl = strategyConfig.logoutUrl?.replace(
        'idp:8080',
        'localhost:8080'
      )
    }
    // END DEVELOPMENT ONLY

    const samlStrategy = new SamlStrategy(strategyConfig, function (
      req,
      profile,
      done
    ) {
      // Verify the response & user here
      console.log('verify user', profile)
      return done(null, profile as User)
    })

    passport.use('saml', samlStrategy)

    passport.logoutSaml = function (req, done) {
      // Take our LogoutRequest type and cast it as the expected RequestWithUser type
      const samlRequest = {
        ...req,
        samlLogoutRequest: null,
      } as unknown as RequestWithUser

      samlStrategy.logout(samlRequest, done)
    }
  } catch (err) {
    // TODO - log error
    // eslint-disable-next-line no-console
    console.error(`Error loading SAML metadata from URL ${IDP_METADATA}`, err)
    throw err
    // process.exit(1)
  }
}
