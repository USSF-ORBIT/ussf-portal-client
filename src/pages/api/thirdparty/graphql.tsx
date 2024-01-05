import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { GraphQLError } from 'graphql'
import ThirdPartyKeystoneAPI from './dataSources/thirdPartyKeystone'
import { resolvers } from './resolvers'
import { typeDefs } from './schema'
import { authMiddleware } from './auth'
import * as jose from 'jose'

/* Apollo Server */
const server = new ApolloServer({
  typeDefs,
  resolvers,
})
// mock out jwt
const secret = new TextEncoder().encode('top-secret-key-for-signing-jwt-tokens')
const alg = 'HS256'
// @ts-ignore
const jwt = await new jose.SignJWT({ 'urn:example:claim': true })
  .setProtectedHeader({ alg })
  .setIssuedAt()
  .setIssuer('urn:example:issuer')
  .setAudience('urn:example:audience')
  .setExpirationTime('2h')
  .sign(secret)

console.log('💎JWT!', jwt)

/* Next.js Handler */
export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    const { cache } = server
    // Check for JWT
    const session = await authMiddleware(req)
    console.log('🚨What is Session in the graphql Server? ', session)

    try {
      return {
        // This server utilizes dataSources to access external APIs, similar to the portal
        // GraphQL server. We're using existing Keystone API data source to avoid duplication.
        dataSources: {
          keystoneAPI: new ThirdPartyKeystoneAPI({ cache }),
        },
      }
    } catch (e) {
      console.error('Error creating GraphQL context', e)

      throw new GraphQLError('Error creating GraphQL context', {
        extensions: { code: 'INTERNAL_SERVER_ERROR' },
      })
    }
  },
})
