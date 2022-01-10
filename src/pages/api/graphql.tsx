import { ServerResponse } from 'http'

import { MicroRequest } from 'apollo-server-micro/dist/types'
import {
  ApolloServer,
  AuthenticationError,
  ApolloError,
} from 'apollo-server-micro'
import { ApolloServerPluginLandingPageDisabled } from 'apollo-server-core'
import type { PageConfig } from 'next'

import { typeDefs } from '../../schema'
import resolvers from '../../resolvers/index'
import clientPromise from '../../utils/mongodb'

import type { SessionUser } from 'types/index'
import { getSession } from 'lib/session'
import User from 'models/User'

export const config: PageConfig = {
  api: { bodyParser: false },
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
      const client = await clientPromise
      const db = client.db(process.env.MONGODB_DB)

      const loggedInUser = session.passport.user as SessionUser
      const { userId } = loggedInUser

      // Check if user exists. If not, create new user
      const foundUser = await User.findOne(userId, { db })
      if (!foundUser) {
        try {
          await User.createOne(userId, { db })
        } catch (e) {
          // TODO log error
          // console.error('error in creating new user', e)
          throw new ApolloError('Error creating new user')
        }
      }

      // Set db connection and user in context
      return { db, user: loggedInUser }
    } catch (e) {
      // TODO log error
      // console.error('error in creating context', e)
      throw new ApolloError('Error creating GraphQL context')
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
