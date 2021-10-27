import fs from 'fs'
import { Strategy as SamlStrategy } from 'passport-saml'

const ISSUER = 'ussf-portal-client' // TODO - get this value from C1

// TODO - move into env
const IDP_ENTRYPOINT =
  'http://localhost:8080/simplesaml/saml2/idp/SSOService.php'
const LOGOUT_URL =
  'http://localhost:8080/simplesaml/saml2/idp/SingleLogoutService.php'
const IDP_CERT = '/certs/idp_key.pem'

type User = Record<string, string>

export const samlStrategy = new SamlStrategy(
  {
    path: '/api/auth/login',
    entryPoint: IDP_ENTRYPOINT,
    issuer: ISSUER,
    audience: ISSUER,
    cert: fs.readFileSync(process.cwd() + IDP_CERT, 'utf8'), // IdP public cert
    disableRequestedAuthnContext: true, // for ADFS - https://github.com/node-saml/passport-saml/issues/226
    authnRequestBinding: 'HTTP-Redirect', // default, or: 'HTTP-POST'
    logoutUrl: LOGOUT_URL,
    logoutCallbackUrl: '/api/auth/logout',

    // passport config
    passReqToCallback: true,
  },
  function (req, profile, done) {
    console.log('got profile', profile)
    const profileAttributes = (profile?.attributes as User) || {}
    done(null, profileAttributes)
  }
)
