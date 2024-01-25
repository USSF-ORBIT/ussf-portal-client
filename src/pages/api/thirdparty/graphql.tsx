import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { GraphQLError } from 'graphql'
import * as jose from 'jose'
import ThirdPartyKeystoneAPI from './dataSources/thirdPartyKeystone'
import { resolvers } from './resolvers'
import { typeDefs } from './schema'
import { authMiddleware } from './auth'
import clientPromise from 'lib/mongodb'

/* Apollo Server */
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const clientConnection = async () => {
  try {
    const client = await clientPromise
    return client
  } catch (e) {
    // TODO add alert/logging for failure to connect to mongo
    console.error('Error connecting to database', e)
    throw e
  }
}

/* Next.js Handler */
export default startServerAndCreateNextHandler(server, {
  context: async (req) => {
    const { cache } = server
    // Check for JWT
    const res = await authMiddleware(req)

    // If JWT exists, decode it and get the user ID
    const user = res.headers.get('Authorization')
    let userId = ''
    if (user) {
      userId = jose.decodeJwt(user)['CN'] as string
    }

    try {
      const client = await clientConnection()
      const mongodb = client.db(process.env.MONGODB_DB)
      return {
        // This server utilizes dataSources to access external APIs, similar to the portal
        // GraphQL server. We're using existing Keystone API data source to avoid duplication.
        dataSources: {
          keystoneAPI: new ThirdPartyKeystoneAPI({ cache }),
          mongodb,
        },
        userId,
      }
    } catch (e) {
      console.error('Error creating GraphQL context', e)

      throw new GraphQLError('Error creating GraphQL context', {
        extensions: { code: 'INTERNAL_SERVER_ERROR' },
      })
    }
  },
})
