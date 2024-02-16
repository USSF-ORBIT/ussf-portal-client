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

export type ThirdPartyUser = {
  userId?: string
  // We can add more user properties here in the future, if
  // resolvers need access to more information about the user.
}

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
    let user: ThirdPartyUser = {}
    // There are two scenarios when using the API:
    // 1. A logged in user is accessing protected information
    // 2. A user is accessing public information

    // If the user is logged in, we want to pass their infomation
    // to the context to be used in the resolvers.

    // If the user is not logged in, we want to pass an empty object
    // to the context to be used in the resolvers.

    // We can use the authMiddleware to check for the JWT
    const res = await authMiddleware(req)

    // If JWT is valid, decode it and get the user ID
    if (res.status === 200) {
      const token = res.headers.get('Authorization')

      if (token) {
        user = { userId: jose.decodeJwt(token)['CN'] as string }
      }
    }

    // At this point, we either have an empty user object, or
    // a user object with a userId property.

    try {
      const client = await clientConnection()
      const mongodb = client.db(process.env.MONGODB_DB)

      // If we have a user object with a userId, we want to check if the
      // user exists in the portal db. If not, we want to create a new user.
      if (user.userId) {
        const foundUser = await User.findOne(user.userId, { db: mongodb })
        if (!foundUser) {
          // Authenticated user not found in portal db
          // Create new record for them
          try {
            // Create new user in portal db
            const initCollection = await getExampleCollection()

            await User.createOne(
              user.userId,
              [initCollection],
              // Default display name is the user's CN since we do not
              // have their first and last name on the token.
              // If/when they log in to the portal, they can update
              user.userId,
              'light',
              {
                db: mongodb,
              }
            )
          } catch (e) {
            console.error('Error creating user', e)
            throw new GraphQLError('Error creating user', {
              extensions: { code: 'INTERNAL_SERVER_ERROR' },
            })
          }
        }
      }

      return {
        // This server utilizes dataSources to access external APIs, similar to the portal
        // GraphQL server. We're using existing Keystone API data source to avoid duplication.
        dataSources: {
          keystoneAPI: new ThirdPartyKeystoneAPI({ cache }),
          mongodb,
        },
        user,
      }
    } catch (e) {
      console.error('Error creating GraphQL context', e)

      throw new GraphQLError('Error creating GraphQL context', {
        extensions: { code: 'INTERNAL_SERVER_ERROR' },
      })
    }
  },
})
