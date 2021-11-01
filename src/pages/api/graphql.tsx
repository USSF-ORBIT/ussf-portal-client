import { ServerResponse } from 'http'

import { MicroRequest } from 'apollo-server-micro/dist/types'

import { v4 } from 'uuid'
import { ApolloServer } from 'apollo-server-micro'
import type { PageConfig } from 'next'
import type { Resolvers } from '@apollo/client'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { typeDefs } from '../../schema'
import type { Bookmark, Collection } from 'types'
import { connectToDB } from 'utils/mongodb'
import { findUser } from '../../services/user.service'

async function connect() {
  return await connectToDB()
}

export const config: PageConfig = {
  api: { bodyParser: false },
}
// #TODO: Refactor after adding support for user session
const testUserId = '252c9a64-48bf-4b22-acd9-a211a9b0b272'
const collections: Collection[] = []

const resolvers: Resolvers = {
  Query: {
    collections: async (root, args, context) => {
      console.log('inside collectinos resolver')
      // const collection = await context.db.collection('users')
      // const data = await collection.find({ userId: testUserId }).toArray()
      // const collections: Collection[] = [data[0].collections]
      // return collections
      const payload = {
        userId: testUserId,
      }
      const foundUser = await findUser(payload)
      console.log(foundUser)
    },
  },
  Mutation: {
    addCollection: (root, args) => {
      const newBookmarks: Bookmark[] = args.bookmarks.map((input: any) => ({
        id: v4(),
        url: input.url,
        label: input.label,
        description: input.description,
      }))

      const newCollection: Collection = {
        id: v4(),
        title: args.title,
        bookmarks: newBookmarks,
      }

      collections.push(newCollection)

      return newCollection
    },
    removeCollection: (root, args) => {
      const deleteIndex = collections.findIndex((c) => c.id === args.id)
      const deleted = collections.splice(deleteIndex, 1)
      return deleted
    },
    removeBookmark: (root, args) => {
      const collection = collections.find((c) => c.id === args.collectionId)
      const deleteIndex =
        collection?.bookmarks.findIndex((b) => b.id === args.id) || -1
      const deleted =
        deleteIndex > -1 && collection?.bookmarks.splice(deleteIndex, 1)
      return deleted
    },
  },
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  context: async () => {
    const db = await connect()
    return { db }
  },
})

const startServer = apolloServer.start()

export default async function handler(req: MicroRequest, res: ServerResponse) {
  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}
