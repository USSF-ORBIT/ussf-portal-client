import { ServerResponse } from 'http'

import { MicroRequest } from 'apollo-server-micro/dist/types'
import {
  ApolloServer,
  AuthenticationError,
  ApolloError,
} from 'apollo-server-micro'
import type { PageConfig } from 'next'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

import { typeDefs } from '../../schema'
import resolvers from '../../resolvers/index'
import clientPromise from '../../utils/mongodb'

import type { SessionUser, PortalUser } from 'types/index'
import { getSession } from 'lib/session'

export const config: PageConfig = {
  api: { bodyParser: false },
}

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  context: async ({ req, res }) => {
    try {
      const session = await getSession(req, res)
      const client = await clientPromise
      const db = client.db(process.env.MONGODB_DB)

      if (!session || !session.passport || !session.passport.user) {
        throw new AuthenticationError('No user in session')
      }

      const user = session.passport.user as SessionUser
      const { userId } = user

      // Check if user exists. If not, create new user
      const foundUser = await db.collection('users').find({ userId }).toArray()

      if (foundUser.length === 0) {
        const newUser: PortalUser = {
          userId,
          isBeta: true,
          mySpace: [],
        }

        try {
          await db.collection('users').insertOne(newUser)
        } catch (e) {
          // TODO log error
          // console.error('error in creating new user', e)
          throw new ApolloError('Error creating new user')
        }
      }
      return { db, user }
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
