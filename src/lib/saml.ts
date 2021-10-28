import { PassportStatic } from 'passport'
import { Strategy as SamlStrategy, Profile } from 'passport-saml'
import { fetch, toPassportConfig } from 'passport-saml-metadata'
import { NextApiRequest } from 'next'
import type * as express from 'express'

const ISSUER = 'ussf-portal-client' // TODO - get this value from C1

// TODO - move into env
const IDP_METADATA = 'http://localhost:8080/simplesaml/saml2/idp/metadata.php'

type User = Record<string, string>

interface RequestWithUser extends express.Request {
  samlLogoutRequest: any
  user?: Profile
}

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

export type LogoutRequest = NextApiRequest & { user: User }

export type LogoutSaml = (
  req: LogoutRequest,
  callback: (err: Error | null, url?: string | null | undefined) => void
) => void

export type PassportWithLogout = PassportStatic & { logoutSaml: LogoutSaml }

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
        console.log('got profile', profile)
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

      passport.serializeUser((user, done) => {
        console.log('-----------------------------')
        console.log('serialize user')
        console.log(user)
        console.log('-----------------------------')
        done(null, user)
      })

      passport.deserializeUser((user, done) => {
        console.log('-----------------------------')
        console.log('deserialize user')
        console.log(user)
        console.log('-----------------------------')
        done(null, user as any)
      })
    })
    .catch((err) => {
      console.error('Error loading SAML metadata', err)
      process.exit(1)
    })
}
