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

export const config: PageConfig = {
  api: { bodyParser: false },
}

const collections: Collection[] = []

const resolvers: Resolvers = {
  Query: {
    collections: async (root, args) => {
      // #TODO Find the best way to create this connection
      const db = await connectToDB()
      const collection = db.collection('users')
      const data = await collection.find({}).toArray()
      const collections: Collection[] = [data[0].collections]

      return collections
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
})

const startServer = apolloServer.start()

export default async function handler(req: MicroRequest, res: ServerResponse) {
  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}
