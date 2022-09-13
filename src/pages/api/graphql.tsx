import type { ServerResponse } from 'http'
import type { MicroRequest } from 'apollo-server-micro/dist/types'
import {
  ApolloServer,
  AuthenticationError,
  ApolloError,
  gql,
} from 'apollo-server-micro'
import { ApolloServerPluginLandingPageDisabled } from 'apollo-server-core'
import type { PageConfig } from 'next'

import { typeDefs } from '../../schema'

import resolvers from 'resolvers/index'
import type { SessionUser, CollectionRecord } from 'types/index'
import { client } from 'lib/keystoneClient'
import clientPromise from 'lib/mongodb'
import { getSession } from 'lib/session'
import User from 'models/User'
import { EXAMPLE_COLLECTION_ID } from 'constants/index'

export const config: PageConfig = {
  api: { bodyParser: false },
}

// To create a new user, we need the example collection from Keystone
const getExampleCollection = async () => {
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

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageDisabled()],
  context: async ({ req, res }) => {
    const session = await getSession(req, res)

    if (!session || !session.passport || !session.passport.user) {
      throw new AuthenticationError('No user in session')
    }

    try {
      const session = await getSession(req, res)
      const client = await clientConnection()

      const db = client.db(process.env.MONGODB_DB)

      const loggedInUser = session.passport.user as SessionUser
      const {
        userId,
        attributes: { givenname, surname },
      } = loggedInUser
      const displayName = `${givenname} ${surname}`

      // Check if user exists. If not, create new user
      const foundUser = await User.findOne(userId, { db })

      const query = {
        userId: userId,
      }

      if (!foundUser) {
        try {
          const initCollection = await getExampleCollection()
          await User.createOne(userId, [initCollection], displayName, 'light', {
            db,
          })
        } catch (e) {
          // TODO log error
          // console.error('error in creating new user', e)
          throw new ApolloError('Error creating new user')
        }
      } else {
        // TODO we should be able to remove these once all exisitng users have the defaults set.
        // set defaults for new fields if user found
        if (!foundUser.displayName) {
          const updateDocument = {
            $set: {
              displayName: displayName,
            },
          }
          await db.collection('users').updateOne(query, updateDocument)
        }

        if (!foundUser.theme) {
          const updateDocument = {
            $set: {
              theme: 'light',
            },
          }
          await db.collection('users').updateOne(query, updateDocument)
        }
      }

      // Set db connection and user in context
      return { db, user: loggedInUser }
    } catch (e) {
      console.error('Error creating GraphQL context', e)

      throw new ApolloError('Error creating GraphQL context', 'SERVER_ERROR')
    }
  },
})

const startServer = apolloServer.start()

export default async function handler(req: MicroRequest, res: ServerResponse) {
  await startServer

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}
