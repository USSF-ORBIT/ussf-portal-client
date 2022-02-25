import { MongoClient, Db } from 'mongodb'
import { ApolloServer } from 'apollo-server-micro'
import type { VariableValues } from 'apollo-server-types'

import { typeDefs } from '../schema'
import { newPortalUser } from '../__fixtures__/newPortalUser'

import resolvers from './index'

import { GET_MY_SPACE } from 'operations/queries/getMySpace'
import { GET_COLLECTIONS } from 'operations/queries/getCollections'
import { ADD_COLLECTION } from 'operations/mutations/addCollection'
import { EDIT_COLLECTION } from 'operations/mutations/editCollection'
import { REMOVE_COLLECTION } from 'operations/mutations/removeCollection'
import { ADD_COLLECTIONS } from 'operations/mutations/addCollections'
import { ADD_BOOKMARK } from 'operations/mutations/addBookmark'
import { REMOVE_BOOKMARK } from 'operations/mutations/removeBookmark'
import { EDIT_BOOKMARK } from 'operations/mutations/editBookmark'
import { ADD_WIDGET } from 'operations/mutations/addWidget'
import { REMOVE_WIDGET } from 'operations/mutations/removeWidget'

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
      ['getMySpace', GET_MY_SPACE],
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
      ['addWidget', ADD_WIDGET, { title: 'Recent news', type: 'News' }],
      ['removeWidget', REMOVE_WIDGET, { _id: 'testWidgetId' }],
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

    beforeEach(async () => {
      // Reset db before each test
      await db.collection('users').deleteMany({})
      await db.collection('users').insertOne(newPortalUser)
    })

    describe('getMySpace', () => {
      it('returns all widgets for the logged in user', async () => {
        const result = await server.executeOperation({
          query: GET_MY_SPACE,
        })

        const expectedData = { ...newPortalUser }

        expect(result.errors).toBeUndefined()

        expect(JSON.stringify(result.data)).toEqual(
          JSON.stringify({ mySpace: expectedData.mySpace })
        )
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

    describe('addWidget', () => {
      it('adds a new widget to the user’s My Space', async () => {
        const result = await server.executeOperation({
          query: ADD_WIDGET,
          variables: {
            title: 'Recent news',
            type: 'News',
          },
        })

        const expectedData = {
          _id: expect.any(String),
          title: 'Recent news',
          type: 'News',
        }

        expect(result.errors).toBeUndefined()
        expect(result.data).toMatchObject({ addWidget: expectedData })
      })
    })

    describe('removeWidget', () => {
      it('removes an existing widget from the user’s My Space', async () => {
        const result = await server.executeOperation({
          query: REMOVE_WIDGET,
          variables: {
            _id: 'testWidgetId',
          },
        })

        const expectedData = {
          _id: 'testWidgetId',
        }

        expect(result.errors).toBeUndefined()
        expect(result.data).toMatchObject({ removeWidget: expectedData })
      })
    })

    describe('addCollection', () => {
      it('adds a new collection to the user’s My Space', async () => {
        const result = await server.executeOperation({
          query: ADD_COLLECTION,
          variables: {
            title: '',
            bookmarks: [],
          },
        })

        const expectedData = {
          _id: expect.any(String),
          title: '',
          bookmarks: [],
        }

        expect(result.errors).toBeUndefined()
        expect(result.data).toMatchObject({ addCollection: expectedData })
      })
    })

    describe('editCollection', () => {
      it('edits an existing collection', async () => {
        const editCollection = newPortalUser.mySpace.find(
          (w) => w.type === 'Collection'
        )

        const result = await server.executeOperation({
          query: EDIT_COLLECTION,
          variables: {
            _id: `${editCollection?._id}`,
            title: 'Edited Collection Title',
          },
        })

        const expectedData = {
          _id: `${editCollection?._id}`,
          title: 'Edited Collection Title',
        }

        expect(result.errors).toBeUndefined()
        expect(result.data).toMatchObject({ editCollection: expectedData })
      })
    })

    describe('removeCollection', () => {
      it('deletes an existing collection', async () => {
        const removeCollection = newPortalUser.mySpace.find(
          (w) => w.type === 'Collection'
        )

        const result = await server.executeOperation({
          query: REMOVE_COLLECTION,
          variables: {
            _id: `${removeCollection?._id}`,
          },
        })

        const expectedData = {
          _id: `${removeCollection?._id}`,
        }

        expect(result.errors).toBeUndefined()
        expect(result.data).toMatchObject({ removeCollection: expectedData })
      })
    })

    describe('addCollections', () => {
      it('adds multiple new collections to the user’s My Space', async () => {
        const result = await server.executeOperation({
          query: ADD_COLLECTIONS,
          variables: {
            collections: [
              {
                id: 'cmsCollectionId1',
                title: 'CMS Collection 1',
                bookmarks: [
                  {
                    id: 'cmsBookmarkId1',
                    url: 'https://google.com',
                    label: 'Webmail',
                  },
                  {
                    id: 'cmsBookmarkId2',
                    url: 'https://mypay.dfas.mil/#/',
                    label: 'MyPay',
                  },
                  {
                    id: 'cmsBookmarkId3',
                    url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
                    label: 'vMPF',
                  },
                  {
                    id: 'cmsBookmarkId4',
                    url: 'https://leave.af.mil/profile',
                    label: 'LeaveWeb',
                  },
                  {
                    id: 'cmsBookmarkId5',
                    url: 'https://www.e-publishing.af.mil/',
                    label: 'e-Publications',
                  },
                ],
              },
              {
                id: 'cmsCollectionId2',
                title: 'CMS Collection 2',
                bookmarks: [
                  {
                    id: 'cmsBookmarkId6',
                    url: 'https://google.com',
                    label: 'Search Engine',
                  },
                ],
              },
            ],
          },
        })

        const expectedData = [
          {
            _id: expect.any(String),
            cmsId: 'cmsCollectionId1',
            title: 'CMS Collection 1',
            type: 'Collection',
            bookmarks: [
              {
                _id: expect.any(String),
                cmsId: 'cmsBookmarkId1',
                url: 'https://google.com',
                label: 'Webmail',
              },
              {
                _id: expect.any(String),
                cmsId: 'cmsBookmarkId2',
                url: 'https://mypay.dfas.mil/#/',
                label: 'MyPay',
              },
              {
                _id: expect.any(String),
                cmsId: 'cmsBookmarkId3',
                url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
                label: 'vMPF',
              },
              {
                _id: expect.any(String),
                cmsId: 'cmsBookmarkId4',
                url: 'https://leave.af.mil/profile',
                label: 'LeaveWeb',
              },
              {
                _id: expect.any(String),
                cmsId: 'cmsBookmarkId5',
                url: 'https://www.e-publishing.af.mil/',
                label: 'e-Publications',
              },
            ],
          },
          {
            _id: expect.any(String),
            cmsId: 'cmsCollectionId2',
            title: 'CMS Collection 2',
            type: 'Collection',
            bookmarks: [
              {
                _id: expect.any(String),
                cmsId: 'cmsBookmarkId6',
                url: 'https://google.com',
                label: 'Search Engine',
              },
            ],
          },
        ]

        expect(result.errors).toBeUndefined()
        expect(result.data).toMatchObject({ addCollections: expectedData })
      })
    })

    describe('addBookmark', () => {
      it('adds a bookmark to an existing collection', async () => {
        const collection = newPortalUser.mySpace[0]

        const result = await server.executeOperation({
          query: ADD_BOOKMARK,
          variables: {
            collectionId: `${collection._id}`,
            label: 'New Label',
            url: 'http://www.example.com/new',
            cmsId: 'testBookmarkCmsId',
          },
        })

        const expectedData = {
          _id: expect.any(String),
          label: 'New Label',
          url: 'http://www.example.com/new',
          cmsId: 'testBookmarkCmsId',
        }

        expect(result.errors).toBeUndefined()

        expect(result.data).toMatchObject({ addBookmark: expectedData })
      })
    })

    describe('editBookmark', () => {
      it('edits an existing bookmark', async () => {
        const editBookmark = newPortalUser.mySpace[0].bookmarks.filter(
          (b) => b.cmsId === null
        )[0]

        const result = await server.executeOperation({
          query: EDIT_BOOKMARK,
          variables: {
            _id: `${editBookmark._id}`,
            collectionId: `${newPortalUser.mySpace[0]._id}`,
            label: 'New Label',
            url: 'http://www.example.com/new',
          },
        })

        const expectedData = {
          _id: editBookmark._id,
          label: 'New Label',
          url: 'http://www.example.com/new',
        }

        expect(result.errors).toBeUndefined()

        expect(JSON.stringify(result.data)).toEqual(
          JSON.stringify({ editBookmark: expectedData })
        )
      })
    })

    describe('removeBookmark', () => {
      it('deletes an existing bookmark', async () => {
        const collection = newPortalUser.mySpace[0]
        const bookmark = collection.bookmarks[0]

        const result = await server.executeOperation({
          query: REMOVE_BOOKMARK,
          variables: {
            _id: `${bookmark?._id}`,
            collectionId: `${collection?._id}`,
          },
        })

        const expectedData = {
          _id: `${bookmark._id}`,
        }

        expect(result.errors).toBeUndefined()
        expect(result.data).toMatchObject({ removeBookmark: expectedData })
      })
    })
  })
})
