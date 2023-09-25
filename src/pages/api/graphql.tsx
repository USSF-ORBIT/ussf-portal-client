import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { gql } from 'graphql-tag'
import { GraphQLError } from 'graphql'
import { typeDefs } from '../../schema'
import WeatherAPI from './dataSources/weather'
import KeystoneAPI from './dataSources/keystone'
import PersonnelAPI from './dataSources/personnel'
import resolvers from 'resolvers/index'
import type { SessionUser, CollectionRecord, ServerContext } from 'types/index'
import { client } from 'lib/keystoneClient'
import clientPromise from 'lib/mongodb'
import { getSession } from 'lib/session'
import User from 'models/User'
import { EXAMPLE_COLLECTION_ID } from 'constants/index'

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

export const apolloServer = new ApolloServer<ServerContext>({
  typeDefs,
  resolvers,
  status400ForVariableCoercionErrors: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageDisabled()],
})

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => {
    const session = await getSession(req, res)
    const { cache } = apolloServer

    if (!session || !session.passport || !session.passport.user) {
      throw new GraphQLError('No User in session', {
        extensions: { code: 'UNAUTHENTICATED' },
      })
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

      if (!foundUser) {
        try {
          const initCollection = await getExampleCollection()
          await User.createOne(userId, [initCollection], displayName, 'light', {
            db,
          })
        } catch (e) {
          // TODO log error
          // console.error('error in creating new user', e)

          throw new GraphQLError('Error in creating user', {
            extensions: { code: 'INTERNAL_SERVER_ERROR' },
          })
        }
      }

      // Set db connection, keystone api, data sources, and user in context
      return {
        db,
        user: loggedInUser,
        dataSources: {
          keystoneAPI: new KeystoneAPI({ cache }),
          weatherAPI: new WeatherAPI({ cache }),
          personnelAPI: new PersonnelAPI({ cache }),
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
