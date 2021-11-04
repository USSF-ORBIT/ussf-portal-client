import { ServerResponse } from 'http'

import { MicroRequest } from 'apollo-server-micro/dist/types'

import { ApolloServer } from 'apollo-server-micro'
import type { PageConfig } from 'next'
import type { Resolvers } from '@apollo/client'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { typeDefs } from '../../schema'
import type { Bookmark, Collection } from 'types/index'
import clientPromise from 'utils/mongodb'
import { ObjectId } from 'mongodb'
export const config: PageConfig = {
  api: { bodyParser: false },
}
// #TODO remove this

const commonName = 'HALL.MICHAEL.0123456789'

const resolvers: Resolvers = {
  Query: {
    collections: async (_, args, { db }) => {
      try {
        const foundUser = await db
          .collection('users')
          .find({ commonName: commonName })
          .toArray()

        return foundUser[0].mySpace
      } catch (e) {
        console.error('error in query collections', e)
      }
    },
  },
  Mutation: {
    // addCollection: async (_, args, { db }) => {
    //   const newBookmarks: Bookmark[] = args.bookmarks.map((input: any) => ({
    //     _id: new ObjectId().toHexString(),
    //     url: input.url,
    //     label: input.label,
    //     description: input.description,
    //   }))

    //   console.log('what are the new bookmarks,', newBookmarks)

    //   const newCollection: Collection = {
    //     _id: new ObjectId().toHexString(),
    //     title: args.title,
    //     bookmarks: newBookmarks,
    //   }

    //   const foundUser = await db
    //     .collection('users')
    //     .find({ commonName: commonName })
    //     .toArray()

    // return newCollection
    //   return
    // },
    editCollection: async (_, { _id, title }, { db }) => {
      const query = {
        commonName: commonName,
        'mySpace._id': new ObjectId(_id),
      }

      const updateDocument = {
        $set: {
          'mySpace.$.title': title,
        },
      }

      try {
        await db.collection('users').updateOne(query, updateDocument)

        const c = await db
          .collection('users')
          .find({ 'mySpace._id': new ObjectId(_id) })
          .project({ 'mySpace.$': 1, _id: 0 })
          .toArray()

        return c[0].mySpace[0]
      } catch (e) {
        console.error('error in edit collection', e)
        return e
      }
    },
    removeCollection: async (root, { _id }, { db }) => {
      const query = {
        commonName: commonName,
      }

      const updateDocument = {
        $pull: {
          mySpace: { _id: new ObjectId(_id) },
        },
      }

      try {
        const result = await db
          .collection('users')
          .updateOne(query, updateDocument)
        console.log('result of delete is -- ', result)

        // TODO this works but need to figure out what to return
      } catch (e) {
        console.error('error in remove collection', e)
        return e
      }
    },
    removeBookmark: async (root, args, { db }) => {
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
