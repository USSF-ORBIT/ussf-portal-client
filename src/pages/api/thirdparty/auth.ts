import { NextResponse } from 'next/server'
import * as jose from 'jose'
import { NextApiRequest } from 'next'
// Derived from values in the well-known OpenID configuration
// https://federation.test.cce.af.mil/oidc/guardian-one/.well-known/openid-configuration
const JWKS_URI = 'https://federation.test.cce.af.mil/oidc/guardian-one/keys'
const ISSUER = 'https://federation.test.cce.af.mil/oidc/guardian-one'

export async function authMiddleware(req: NextApiRequest) {
  if (req.method === 'OPTIONS') {
    return NextResponse.json({})
  }
  // Bearer tokens are sent in the Authorization header
  // Strip out the word Bearer and just get the token
  const token = req.headers.authorization?.split(' ')[1]

  if (token) {
    return await authenticateRequest(token)
  } else {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Authentication failed: No token given',
      }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }
}

async function authenticateRequest(token: string) {
  try {
    // Load public key from authentication provider
    const jwks = jose.createRemoteJWKSet(new URL(JWKS_URI))

    await jose.jwtVerify(token, jwks, {
      issuer: ISSUER,
      audience: 'guardian-one',
    })

    // The token was valid, return a success response
    return new NextResponse(
      JSON.stringify({
        success: true,
        message: 'Authentication succeeded',
      }),
      {
        status: 200,
        // Return the token and decode on the server
        headers: { 'content-type': 'application/json', Authorization: token },
      }
    )
  } catch (error) {
    // The token was not valid.

    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Authentication failed: Token could not be verified',
      }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }
}
