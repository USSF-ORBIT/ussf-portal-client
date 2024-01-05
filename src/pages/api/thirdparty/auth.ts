import { NextRequest, NextResponse } from 'next/server'
import * as jose from 'jose'
import { NextApiRequest, NextApiResponse } from 'next'
// Derived from values in the well-known OpenID configuration
// https://federation.test.cce.af.mil/oidc/guardian-one/.well-known/openid-configuration
const JWKS_URI = 'https://federation.test.cce.af.mil/oidc/guardian-one/keys'
const ISSUER = 'https://federation.test.cce.af.mil/oidc/guardian-one'

// const secret = new TextEncoder().encode('top-secret-key-for-signing-jwt-tokens')

export async function authMiddleware(req: NextApiRequest) {
  if (req.method === 'OPTIONS') {
    return NextResponse.json({})
  }

  const token = req.headers.authorization
  console.log('headers --- ', req.headers)
  console.log('🤡token --- ', token)

  if (token) {
    await authenticateRequest(token)
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

    const response = await jose.jwtVerify(token, jwks, {
      issuer: ISSUER,
      audience: 'guardian-one',
    })
    console.log('what is the response iiiiiii', response)
    // If the token is valid, you can use the payload, which would contain claims like `sub` and `CN`
    console.log('Token is valid:', response.payload)

    return NextResponse.next()
  } catch (error) {
    // The token was not valid.
    console.error('Token validation error:', (error as Error).message)

    console.error('Authentication failed: Token could not be verified')
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Authentication failed: Token could not be verified',
      }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }
}
