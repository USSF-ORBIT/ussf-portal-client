import { PassportStatic } from 'passport'
import { Strategy as SamlStrategy } from 'passport-saml'
import { fetch, toPassportConfig } from 'passport-saml-metadata'

const ISSUER = 'ussf-portal-client' // TODO - get this value from C1

// TODO - move into env
const IDP_METADATA = 'http://localhost:8080/simplesaml/saml2/idp/metadata.php'

type User = Record<string, string>

const samlConfig = {
  path: '/api/auth/login',
  logoutCallbackUrl: '/api/auth/logout',
  issuer: ISSUER,
  audience: ISSUER,
  disableRequestedAuthnContext: true, // for ADFS - https://github.com/node-saml/passport-saml/issues/226
  authnRequestBinding: 'HTTP-Redirect', // default, or: 'HTTP-POST'

  // passport config
  passReqToCallback: true,
}

export const configSaml = (passport: PassportStatic) => {
  fetch({ url: IDP_METADATA })
    .then((reader) => {
      const strategyConfig = {
        ...toPassportConfig(reader),
        ...samlConfig,
      }

      passport.use(
        new SamlStrategy(strategyConfig, function (req, profile, done) {
          // Verify the response & user here
          console.log('got profile', profile)
          return done(null, profile as User)
        })
      )

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
