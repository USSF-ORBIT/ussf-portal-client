import { ServerResponse } from 'http'

import { MicroRequest } from 'apollo-server-micro/dist/types'

import { ApolloServer } from 'apollo-server-micro'
import type { PageConfig } from 'next'
import type { Resolvers } from '@apollo/client'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ObjectId } from 'mongodb'
import { typeDefs } from '../../schema'
import { BookmarkModel } from '../../models/Bookmark'
import type {
  BookmarkInput,
  BookmarkRecord,
  Collection,
  CollectionInput,
  CollectionRecord,
  PortalUser,
} from 'types/index'
import clientPromise from 'utils/mongodb'

export const config: PageConfig = {
  api: { bodyParser: false },
}
// #TODO remove this once we have sessions
const commonName = 'HALL.MICHAEL.0123456789'

const resolvers: Resolvers = {
  Query: {
    collections: async (_, args, { db }) => {
      try {
        const foundUser = await db
          .collection('users')
          .find({ commonName: commonName })
          .toArray()

        if (foundUser.length > 0) {
          return foundUser[0].mySpace
        }
      } catch (e) {
        // TODO error logging
        // eslint-disable-next-line no-console
        console.error('error in query collections', e)
      }
    },
  },
  Mutation: {
    addCollection: async (_, { title, bookmarks }, { db }) => {
      const newBookmarks: BookmarkInput[] = bookmarks.map(
        (input: BookmarkInput) => ({
          _id: new ObjectId(),
          url: input.url,
          label: input.label,
        })
      )

      const newCollection: CollectionInput = {
        _id: new ObjectId(),
        title: title,
        bookmarks: newBookmarks,
      }

      const query = {
        commonName: commonName,
      }

      const updateDocument = {
        $push: {
          mySpace: newCollection,
        },
      }

      try {
        await db.collection('users').updateOne(query, updateDocument)
        return newCollection
      } catch (e) {
        // TODO error logging
        // eslint-disable-next-line no-console
        console.error('error in add collection', e)
        return e
      }
    },
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

        const updatedCollection = await db
          .collection('users')
          .find({ 'mySpace._id': new ObjectId(_id) })
          .project({ 'mySpace.$': 1, _id: 0 })
          .toArray()

        return updatedCollection[0].mySpace[0]
      } catch (e) {
        // TODO error logging
        // eslint-disable-next-line no-console
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
          mySpace: {
            _id: new ObjectId(_id),
          },
        },
      }

      try {
        // Update and save modified document
        const updated = await db
          .collection('users')
          .findOneAndUpdate(query, updateDocument, { returnDocument: 'after' })

        // #TODO add error check
        const removedCollection: Collection = updated?.value?.mySpace[0]

        return removedCollection
      } catch (e) {
        // TODO error logging
        // eslint-disable-next-line no-console
        console.error('error in remove collection', e)
        return e
      }
    },
    addCollections: async (_, args, { db }) => {
      const newCollections = args.collections.map(
        (collection: CollectionRecord) => ({
          _id: new ObjectId(),
          // #TODO Future data modeling to be done for canonical collections
          cmsId: collection.id,
          title: collection.title,
          bookmarks: collection.bookmarks.map((bookmark: BookmarkRecord) => ({
            _id: new ObjectId(),
            cmsId: bookmark.id,
            url: bookmark.url,
            label: bookmark.label,
          })),
        })
      )

      const query = {
        commonName: commonName,
      }

      const updateDocument = {
        $push: {
          mySpace: {
            $each: newCollections,
          },
        },
      }

      try {
        await db.collection('users').updateOne(query, updateDocument)
        const updatedCollections = await db
          .collection('users')
          .find({
            commonName: commonName,
          })
          .toArray()

        return updatedCollections[0].mySpace
      } catch (e) {
        // TODO error logging
        // eslint-disable-next-line no-console
        console.error('error in add collections', e)
        return e
      }
    },
    addBookmark: async (root, { cmsId, collectionId, url, label }, { db }) => {
      const newBookmark: BookmarkInput = {
        _id: new ObjectId(),
        url,
        label,
        cmsId,
      }

      const query = {
        'mySpace._id': new ObjectId(collectionId),
      }

      const updateDocument = {
        $push: {
          'mySpace.$.bookmarks': newBookmark,
        },
      }
      try {
        // Update and save modified document
        await db
          .collection('users')
          .findOneAndUpdate(query, updateDocument, { returnDocument: 'after' })

        return newBookmark
      } catch (e) {
        // TODO error logging
        // eslint-disable-next-line no-console
        console.error('error in add bookmark', e)
        return e
      }
    },
    removeBookmark: async (root, { _id, collectionId, cmsId }, { db }) => {
      if (cmsId) {
        return BookmarkModel.hideOne(_id, collectionId, db)
      } else {
        return BookmarkModel.deleteOne(_id, collectionId, db)
      }
    },
  },
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  context: async () => {
    try {
      const client = await clientPromise
      const db = client.db(process.env.MONGODB_DB)
      // Check if user exists. If not, create new user
      const foundUser = await db
        .collection('users')
        .find({ commonName: commonName })
        .toArray()

      if (foundUser.length === 0) {
        const newUser: PortalUser = {
          commonName: commonName,
          isBeta: true,
          mySpace: [],
        }
        try {
          await db.collection('users').insertOne(newUser)
        } catch (e) {
          console.error('error in creating new user', e)
          return e
        }
      }
      return { db }
    } catch (e) {
      console.error('error in creating context', e)
      return e
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
