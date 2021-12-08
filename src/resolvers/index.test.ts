import { MongoClient, Db } from 'mongodb'
import { ApolloServer } from 'apollo-server-micro'
import type { VariableValues } from 'apollo-server-types'

import { typeDefs } from '../schema'
import { newPortalUser } from '../__fixtures__/newPortalUser'

import resolvers from './index'

import { GET_COLLECTIONS } from 'operations/queries/getCollections'
import { ADD_COLLECTION } from 'operations/mutations/addCollection'
import { EDIT_COLLECTION } from 'operations/mutations/editCollection'
import { REMOVE_COLLECTION } from 'operations/mutations/removeCollection'
import { ADD_COLLECTIONS } from 'operations/mutations/addCollections'
import { ADD_BOOKMARK } from 'operations/mutations/addBookmark'
import { REMOVE_BOOKMARK } from 'operations/mutations/removeBookmark'

let server: ApolloServer
let connection: typeof MongoClient
let db: typeof Db

describe('GraphQL resolvers', () => {
  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    db = await connection.db()
  })

  afterAll(async () => {
    await connection.close()
  })

  describe('without being logged in', () => {
    beforeAll(async () => {
      server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({
          db,
          user: undefined,
        }),
      })
    })

    it.each([
      ['getCollections', GET_COLLECTIONS],
      [
        'addCollection',
        ADD_COLLECTION,
        {
          title: 'Test Collection',
          bookmarks: [],
        },
      ],
      [
        'editCollection',
        EDIT_COLLECTION,
        {
          _id: 'testCollectionId',
          title: 'New Test Collection',
        },
      ],
      [
        'removeCollection',
        REMOVE_COLLECTION,
        {
          _id: 'testCollectionId',
        },
      ],
      [
        'addCollections',
        ADD_COLLECTIONS,
        {
          collections: [],
        },
      ],
      [
        'addBookmark',
        ADD_BOOKMARK,
        { url: 'test', label: 'Test', collectionId: 'testCollectionId' },
      ],
      [
        'removeBookmark',
        REMOVE_BOOKMARK,
        {
          _id: 'testBookmarkId',
          collectionId: 'testCollectionId',
        },
      ],
    ])(
      'the %s operation returns an authentication error',
      async (name, op, variables: VariableValues = {}) => {
        const result = await server.executeOperation({
          query: op,
          variables,
        })

        expect(result.errors).toHaveLength(1)

        if (result.errors?.length) {
          // console.log(result.errors[0].message)
          expect(result.errors[0].extensions?.code).toEqual('UNAUTHENTICATED')
          expect(result.errors[0].message).toEqual(
            'You must be logged in to perform this operation'
          )
        }
      }
    )
  })

  describe('while logged in', () => {
    beforeAll(async () => {
      // Init database
      const users = db.collection('users')
      await users.insertOne(newPortalUser)

      server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({
          db,
          user: {
            userId: newPortalUser.userId,
          },
        }),
      })
    })

    describe('getCollections', () => {
      it('returns all collections for the logged in user', async () => {
        const result = await server.executeOperation({
          query: GET_COLLECTIONS,
        })

        const expectedData = { ...newPortalUser }

        expectedData.mySpace.forEach((c: any) => {
          c.bookmarks = c.bookmarks.map((b: any) => ({
            _id: b._id,
            url: b.url,
            label: b.label,
            cmsId: b.cmsId,
            isRemoved: b.isRemoved,
          }))
        })

        expect(result.errors).toBeUndefined()

        expect(JSON.stringify(result.data)).toEqual(
          JSON.stringify({ collections: expectedData.mySpace })
        )
      })
    })
  })
})
