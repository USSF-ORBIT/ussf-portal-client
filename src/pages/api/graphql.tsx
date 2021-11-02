import { ServerResponse } from 'http'

import { MicroRequest } from 'apollo-server-micro/dist/types'

import { v4 } from 'uuid'
import { ApolloServer } from 'apollo-server-micro'
import type { PageConfig } from 'next'
import type { Resolvers } from '@apollo/client'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { typeDefs } from '../../schema'
import type { Bookmark, Collection } from 'types'
import clientPromise from 'utils/mongodb'

export const config: PageConfig = {
  api: { bodyParser: false },
}
// #TODO remove this
const testUserId = '252c9a64-48bf-4b22-acd9-a211a9b0b272'
// const collections: Collection[] = []

const resolvers: Resolvers = {
  Query: {
    collections: async (root, args, context) => {
      const users = await context.db.collection('users')
      const foundUser = await users.find({ userId: testUserId }).toArray()

      const collections = foundUser[0].collections
      return collections
    },
  },
  Mutation: {
    addCollection: async (root, args, context) => {
      // const newBookmarks: Bookmark[] = args.bookmarks.map((input: any) => ({
      //   id: v4(),
      //   url: input.url,
      //   label: input.label,
      //   description: input.description,
      // }))

      // const newCollection: Collection = {
      //   id: v4(),
      //   title: args.title,
      //   bookmarks: newBookmarks,
      // }

      const foundUser = await context.db
        .collection('users')
        .find({ userId: testUserId })
        .toArray()

      console.log('found user in add collection', foundUser)

      // const collections = [foundUser[0].collections]

      // collections.push(newCollection)

      // return newCollection
      return
    },
    editCollection: async (root, { id, title }, { db }) => {
      const users = await db.collection('users')

      const query = {
        'collections.id': id,
      }

      const updateDocument = {
        $set: { 'collections.$.title': title },
      }
      try {
        await users.updateOne(query, updateDocument)

        const updatedCollection = await users.findOne({
          'collections.id': id,
        })

        return updatedCollection.collections[0]
      } catch (e) {
        console.log('error in editCollection', e)
        return e
      }
    },
    removeCollection: async (root, args, context) => {
      // const deleteIndex = collections.findIndex((c) => c.id === args.id)
      // const deleted = collections.splice(deleteIndex, 1)
      // return deleted
      console.log('remove colleciton')
      return
    },
    removeBookmark: async (root, args, context) => {
      // const collection = collections.find((c) => c.id === args.collectionId)
      // const deleteIndex =
      //   collection?.bookmarks.findIndex((b) => b.id === args.id) || -1
      // const deleted =
      //   deleteIndex > -1 && collection?.bookmarks.splice(deleteIndex, 1)
      // return deleted

      console.log('remove bookmark')
    },
  },
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  context: async () => {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)

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
