import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { GraphQLError } from 'graphql'
import * as jose from 'jose'
import { gql } from 'graphql-tag'
import { clientConnection } from '../graphql'
import ThirdPartyKeystoneAPI from './dataSources/thirdPartyKeystone'
import { resolvers } from './resolvers'
import { typeDefs } from './schema'
import { authMiddleware } from './auth'
import User from 'models/User'
import { client } from 'lib/keystoneClient'
import { EXAMPLE_COLLECTION_ID } from 'constants/index'
import type { CollectionRecord } from 'types/index'
/* Apollo Server */
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// To create a new user, we need the example collection from Keystone
export const getExampleCollection = async () => {
  // Request the example collection based on ID
  const res = await client.query({
    query: gql`
      query getCollection($where: CollectionWhereUniqueInput!) {
        collection(where: $where) {
          id
          title
          bookmarks {
            id
            url
            label
          }
        }
      }
    `,
    variables: {
      where: {
        id: EXAMPLE_COLLECTION_ID,
      },
    },
  })

  return res.data.collection as CollectionRecord
}

/* Next.js Handler */
export default startServerAndCreateNextHandler(server, {
  context: async (req) => {
    const { cache } = server
    // Check for valid JWT

    const res = await authMiddleware(req)
    if (res.status !== 200) {
      throw new GraphQLError('Authentication failed', {
        extensions: { code: 'UNAUTHENTICATED' },
      })
    }

    // If JWT is valid, decode it and get the user ID
    const user = res.headers.get('Authorization')
    let userId = ''
    if (user) {
      userId = jose.decodeJwt(user)['CN'] as string
    }

    try {
      const client = await clientConnection()
      const mongodb = client.db(process.env.MONGODB_DB)

      const foundUser = await User.findOne(userId, { db: mongodb })

      if (!foundUser) {
        // Authenticated user not found in portal db
        // Create new record for them
        try {
          // Create new user in portal db
          const initCollection = await getExampleCollection()

          await User.createOne(
            userId,
            [initCollection],
            // Default display name is the user's CN since we do not
            // have their first and last name on the token.
            // If/when they log in to the portal, they can update
            userId,
            'light',
            {
              db: mongodb,
            }
            // Q: Should we include last login? They are technically
            // not logging in to the portal. Do we want to use it to track
            // API access as well?
          )
        } catch (e) {
          console.error('Error creating user', e)
          throw new GraphQLError('Error creating user', {
            extensions: { code: 'INTERNAL_SERVER_ERROR' },
          })
        }
      }

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
