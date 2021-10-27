import fs from 'fs'

import { Strategy as SamlStrategy, VerifyWithoutRequest } from 'passport-saml'

const verifyCallback: VerifyWithoutRequest = (profile, done) => {
  console.log('got profile', profile)
  const user = profile?.attributes || {}
  done(null, user)
}

export const samlStrategy = new SamlStrategy(
  {
    path: '/api/login',
    entryPoint: 'http://localhost:8080/simplesaml/saml2/idp/SSOService.php',
    issuer: 'ussf-portal-client',
    cert: fs.readFileSync(process.cwd() + '/certs/idp_key.pem', 'utf8'),
    identifierFormat: null,
    decryptionPvk: fs.readFileSync(process.cwd() + '/certs/key.pem', 'utf8'),
    privateKey: fs.readFileSync(process.cwd() + '/certs/key.pem', 'utf8'),
    validateInResponseTo: false,
    disableRequestedAuthnContext: true,
  },
  verifyCallback
)
