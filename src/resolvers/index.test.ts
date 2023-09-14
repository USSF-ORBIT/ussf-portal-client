import { MongoClient, Db, ObjectId } from 'mongodb'
import { typeDefs } from '../schema'
import { ApolloServer } from '@apollo/server'
import { newPortalUser } from '../__fixtures__/newPortalUser'

import resolvers from './index'

import { GetMySpaceDocument } from 'operations/portal/queries/getMySpace.g'
import { GetCollectionsDocument } from 'operations/portal/queries/getCollections.g'
import { AddCollectionDocument } from 'operations/portal/mutations/addCollection.g'
import { EditCollectionDocument } from 'operations/portal/mutations/editCollection.g'
import { RemoveCollectionDocument } from 'operations/portal/mutations/removeCollection.g'
import { AddCollectionsDocument } from 'operations/portal/mutations/addCollections.g'
import { AddBookmarkDocument } from 'operations/portal/mutations/addBookmark.g'
import { RemoveBookmarkDocument } from 'operations/portal/mutations/removeBookmark.g'
import { EditBookmarkDocument } from 'operations/portal/mutations/editBookmark.g'
import { AddWidgetDocument } from 'operations/portal/mutations/addWidget.g'
import { RemoveWidgetDocument } from 'operations/portal/mutations/removeWidget.g'
import { EditDisplayNameDocument } from 'operations/portal/mutations/editDisplayName.g'
import { GetDisplayNameDocument } from 'operations/portal/queries/getDisplayName.g'
import { EditThemeDocument } from 'operations/portal/mutations/editTheme.g'
import { GetThemeDocument } from 'operations/portal/queries/getTheme.g'
import { AddWeatherWidgetDocument } from 'operations/portal/mutations/addWeatherWidget.g'
import {
  KeystoneAPIMockData as mockKeystoneAPIData,
  WeatherAPIMockData as mockWeatherAPIData,
  exampleWeatherWidget1,
} from '__fixtures__/data/weatherWidgets'
import WeatherAPI from 'pages/api/dataSources/weather'
import KeystoneAPI from 'pages/api/dataSources/keystone'
import { EditWeatherWidgetDocument } from 'operations/portal/mutations/editWeatherWidget.g'
import type { serverContext } from 'types'

let server: ApolloServer<serverContext>
let connection: typeof MongoClient
let db: typeof Db
const testCollectionId = ObjectId()
const testBookmarkId = ObjectId()
const testWidgetId = ObjectId()

// Mock the data sources that are passed into Apollo Server
jest.mock('pages/api/dataSources/keystone', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getLatLong: jest.fn(() => {
        return {
          ...mockKeystoneAPIData,
          loading: false,
          errors: [],
        }
      }),
    }
  })
})

jest.mock('pages/api/dataSources/weather', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getGridData: jest.fn(() => {
        return {
          ...mockWeatherAPIData,
          loading: false,
          errors: [],
        }
      }),
    }
  })
})

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
      server = new ApolloServer<serverContext>({
        typeDefs,
        resolvers,
      })
    })

    it.each([
      ['getMySpace', GetMySpaceDocument],
      ['getCollections', GetCollectionsDocument],
      [
        'addCollection',
        AddCollectionDocument,
        {
          title: 'Test Collection',
          bookmarks: [],
        },
      ],
      [
        'editCollection',
        EditCollectionDocument,
        {
          _id: `${testCollectionId}`,
          title: 'New Test Collection',
        },
      ],
      [
        'removeCollection',
        RemoveCollectionDocument,
        {
          _id: `${testCollectionId}`,
        },
      ],
      [
        'addCollections',
        AddCollectionsDocument,
        {
          collections: [],
        },
      ],
      [
        'addBookmark',
        AddBookmarkDocument,
        { url: 'test', label: 'Test', collectionId: `${testCollectionId}` },
      ],
      [
        'removeBookmark',
        RemoveBookmarkDocument,
        {
          _id: `${testBookmarkId}`,
          collectionId: `${testCollectionId}`,
        },
      ],
      ['addWidget', AddWidgetDocument, { title: 'Recent news', type: 'News' }],
      ['removeWidget', RemoveWidgetDocument, { _id: `${testWidgetId}` }],
      ['getDisplayName', GetDisplayNameDocument, { userId: `${testWidgetId}` }],
      [
        'editDisplayName',
        EditDisplayNameDocument,
        { userId: `${testWidgetId}`, displayName: 'New Name' },
      ],
      ['getTheme', GetThemeDocument, { userId: `${testWidgetId}` }],
      [
        'editTheme',
        EditThemeDocument,
        { userId: `${testWidgetId}`, theme: 'light' },
      ],
      [
        'addWeatherWidget',
        AddWeatherWidgetDocument,
        {
          userId: `${testWidgetId}`,
          title: 'Weather',
          type: 'Weather',
          zipcode: '90210',
        },
      ],
      [
        'editWeatherWidget',
        EditWeatherWidgetDocument,
        {
          userId: `${testWidgetId}`,
          _id: `${testWidgetId}`,
          zipcode: '90210',
        },
      ],
      [
        'editBookmark',
        EditBookmarkDocument,
        {
          _id: `${testBookmarkId}`,
          collectionId: `${testCollectionId}`,
          url: 'test',
          label: 'Test',
        },
      ],
    ])(
      'the %s operation returns an authentication error',
      async (_name, op, variables: VariableValues = {}) => {
        const result = await server.executeOperation({
          query: op,
          variables,
        })

        expect(result.errors).toHaveLength(1)

        if (result.errors?.length) {
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
        dataSources: () => ({
          keystoneAPI: new KeystoneAPI(),
          weatherAPI: new WeatherAPI(),
        }),
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
          query: GetMySpaceDocument,
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
          query: GetCollectionsDocument,
        })

        const expectedData = newPortalUser.mySpace.filter(
          (w) => w.type === 'Collection'
        )

        expect(result.errors).toBeUndefined()

        expect(JSON.stringify(result.data?.collections)).toEqual(
          JSON.stringify(expectedData)
        )
      })
    })

    describe('addWidget', () => {
      it('adds a new News widget to the user’s My Space', async () => {
        const result = await server.executeOperation({
          query: AddWidgetDocument,
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

      it('adds a new FeaturedShortcuts widget to the user’s My Space', async () => {
        const result = await server.executeOperation({
          query: AddWidgetDocument,
          variables: {
            title: 'Featured Shortcuts',
            type: 'FeaturedShortcuts',
          },
        })

        const expectedData = {
          _id: expect.any(String),
          title: 'Featured Shortcuts',
          type: 'FeaturedShortcuts',
        }

        expect(result.errors).toBeUndefined()
        expect(result.data).toMatchObject({ addWidget: expectedData })
      })

      it('adds a new GuardianIdeal widget to the user’s My Space', async () => {
        const result = await server.executeOperation({
          query: AddWidgetDocument,
          variables: {
            title: 'Guardian Ideal',
            type: 'GuardianIdeal',
          },
        })

        const expectedData = {
          _id: expect.any(String),
          title: 'Guardian Ideal',
          type: 'GuardianIdeal',
        }

        expect(result.errors).toBeUndefined()
        expect(result.data).toMatchObject({ addWidget: expectedData })
      })
    })

    describe('removeWidget', () => {
      it('returns an error if a non-string id is passed', async () => {
        const testWidgetId = ObjectId()

        const result = await server.executeOperation({
          query: RemoveWidgetDocument,
          variables: {
            _id: testWidgetId,
          },
        })

        expect(result.errors).toHaveLength(1)
        expect(result?.errors?.[0].message).toContain(
          'ObjectIdScalar can only parse string values'
        )
      })
      it('removes an existing widget from the user’s My Space', async () => {
        const testWidgetId = ObjectId()

        const result = await server.executeOperation({
          query: RemoveWidgetDocument,
          variables: {
            _id: `${testWidgetId}`,
          },
        })

        const expectedData = {
          _id: `${testWidgetId}`,
        }

        expect(result.errors).toBeUndefined()
        expect(result.data).toMatchObject({ removeWidget: expectedData })
      })
    })

    describe('addCollection', () => {
      it('adds a new collection to the user’s My Space', async () => {
        const result = await server.executeOperation({
          query: AddCollectionDocument,
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
      it('edits an existing collection title', async () => {
        const editCollection = newPortalUser.mySpace.find(
          (w) => w.type === 'Collection'
        )

        const result = await server.executeOperation({
          query: EditCollectionDocument,
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

      it('edits the order of bookmarks in a collection', async () => {
        const editCollection = newPortalUser.mySpace.find(
          (w) => w.type === 'Collection'
        )

        expect(editCollection?.bookmarks?.[0].label).toEqual('Webmail')

        // Reorder bookmarks in collection
        const firstResult = await server.executeOperation({
          query: EditCollectionDocument,
          variables: {
            _id: `${editCollection?._id}`,
            title: 'Example Collection',
            bookmarks: [
              {
                _id: `${editCollection?.bookmarks?.[1]._id.toString()}`,
                url: 'https://mypay.dfas.mil/#/',
                label: 'MyPay',
                cmsId: 'cmsId2',
                isRemoved: null,
              },
              {
                _id: `${editCollection?.bookmarks?.[0]._id.toString()}`,
                url: 'https://google.com',
                label: 'Webmail',
                cmsId: 'cmsId1',
                isRemoved: null,
              },
              {
                _id: `${editCollection?.bookmarks?.[2]._id.toString()}`,
                url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
                label: 'vMPF',
                cmsId: 'cmsId3',
                isRemoved: null,
              },
              {
                _id: `${editCollection?.bookmarks?.[3]._id.toString()}`,
                url: 'https://leave.af.mil/profile',
                label: 'LeaveWeb',
                cmsId: 'cmsId4',
                isRemoved: null,
              },
              {
                _id: `${editCollection?.bookmarks?.[4]._id.toString()}`,
                url: 'https://www.e-publishing.af.mil/',
                label: 'e-Publications',
                cmsId: 'cmsId5',
                isRemoved: null,
              },
              {
                _id: `${editCollection?.bookmarks?.[5]._id.toString()}`,
                url: 'https://example.com',
                label: 'Custom Bookmark',
                cmsId: null,
                isRemoved: null,
              },
            ],
          },
        })

        const expectedFirst = {
          _id: `${editCollection?._id}`,
          title: 'Example Collection',
          bookmarks: [
            {
              _id: `${editCollection?.bookmarks?.[1]._id.toString()}`,
              url: 'https://mypay.dfas.mil/#/',
              label: 'MyPay',
              cmsId: 'cmsId2',
              isRemoved: null,
            },
            {
              _id: `${editCollection?.bookmarks?.[0]._id.toString()}`,
              url: 'https://google.com',
              label: 'Webmail',
              cmsId: 'cmsId1',
              isRemoved: null,
            },
            {
              _id: `${editCollection?.bookmarks?.[2]._id.toString()}`,
              url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
              label: 'vMPF',
              cmsId: 'cmsId3',
              isRemoved: null,
            },
            {
              _id: `${editCollection?.bookmarks?.[3]._id.toString()}`,
              url: 'https://leave.af.mil/profile',
              label: 'LeaveWeb',
              cmsId: 'cmsId4',
              isRemoved: null,
            },
            {
              _id: `${editCollection?.bookmarks?.[4]._id.toString()}`,
              url: 'https://www.e-publishing.af.mil/',
              label: 'e-Publications',
              cmsId: 'cmsId5',
              isRemoved: null,
            },
            {
              _id: `${editCollection?.bookmarks?.[5]._id.toString()}`,
              url: 'https://example.com',
              label: 'Custom Bookmark',
              cmsId: null,
              isRemoved: null,
            },
          ],
        }

        expect(firstResult.errors).toBeUndefined()
        expect(firstResult.data).toMatchObject({
          editCollection: expectedFirst,
        })

        // Reorder bookmarks in collection to match original order
        const secondResult = await server.executeOperation({
          query: EditCollectionDocument,
          variables: {
            _id: `${editCollection?._id}`,
            title: 'Example Collection',
            bookmarks: editCollection?.bookmarks?.map((b) => {
              return {
                ...b,
                _id: `${b._id.toString()}`,
              }
            }),
          },
        })

        const expectedSecond = {
          _id: `${editCollection?._id}`,
          title: 'Example Collection',
          bookmarks: editCollection?.bookmarks?.map((b) => {
            return {
              ...b,
              _id: `${b._id.toString()}`,
            }
          }),
        }

        expect(secondResult.errors).toBeUndefined()
        expect(secondResult.data).toMatchObject({
          editCollection: expectedSecond,
        })
      })
    })

    describe('removeCollection', () => {
      it('deletes an existing collection', async () => {
        const removeCollection = newPortalUser.mySpace.find(
          (w) => w.type === 'Collection'
        )

        const result = await server.executeOperation({
          query: RemoveCollectionDocument,
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
          query: AddCollectionsDocument,
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
          query: AddBookmarkDocument,
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
        const collection = newPortalUser.mySpace[0]
        const editBookmark = collection.bookmarks?.filter(
          (b: any) => b.cmsId === null
        )[0]

        const result = await server.executeOperation({
          query: EditBookmarkDocument,
          variables: {
            _id: `${editBookmark?._id}`,
            collectionId: `${newPortalUser.mySpace[0]._id}`,
            label: 'New Label',
            url: 'http://www.example.com/new',
          },
        })

        const expectedData = {
          _id: `${editBookmark?._id}`,
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
      it('deletes an existing custom bookmark', async () => {
        const collection = newPortalUser.mySpace[0]
        const bookmark = collection.bookmarks?.[0]

        const result = await server.executeOperation({
          query: RemoveBookmarkDocument,
          variables: {
            _id: `${bookmark?._id}`,
            collectionId: `${collection?._id}`,
          },
        })

        const expectedData = {
          _id: `${bookmark?._id}`,
        }

        expect(result.errors).toBeUndefined()
        expect(result.data).toMatchObject({ removeBookmark: expectedData })
      })

      it('hides an existing cms bookmark', async () => {
        const collection = newPortalUser.mySpace[0]
        const bookmark = collection.bookmarks?.[0]

        await server.executeOperation({
          query: RemoveBookmarkDocument,
          variables: {
            _id: `${bookmark?._id}`,
            cmsId: `${bookmark?.cmsId}`,
            collectionId: `${collection?._id}`,
          },
        })

        const updated = await server.executeOperation({
          query: GetMySpaceDocument,
          variables: {
            userId: newPortalUser.userId,
          },
        })

        expect(updated.data?.mySpace[0].bookmarks[0].cmsId).toBe(
          bookmark?.cmsId
        )
        expect(updated.data?.mySpace[0].bookmarks[0].isRemoved).toBe(true)
      })
    })

    describe('getDisplayName', () => {
      it('returns displayName of the user', async () => {
        const result = await server.executeOperation({
          query: GetDisplayNameDocument,
        })

        const expectedData = { ...newPortalUser }

        expect(result.errors).toBeUndefined()

        expect(result.data?.displayName).toEqual(expectedData.displayName)
      })
    })

    describe('editDisplayName', () => {
      it('edits an existing display name', async () => {
        const editDisplayName = newPortalUser

        const result = await server.executeOperation({
          query: EditDisplayNameDocument,
          variables: {
            userId: `${editDisplayName.userId}`,
            displayName: 'New Name',
          },
        })

        const expectedData = {
          userId: `${newPortalUser.userId}`,
          displayName: 'New Name',
        }

        expect(result.errors).toBeUndefined()
        expect(result.data).toMatchObject({ editDisplayName: expectedData })
      })
    })

    describe('getTheme', () => {
      it('returns theme of the user', async () => {
        const result = await server.executeOperation({
          query: GetThemeDocument,
        })

        const expectedData = { ...newPortalUser }

        expect(result.errors).toBeUndefined()

        expect(result.data?.theme).toEqual(expectedData.theme)
      })
    })

    describe('editTheme', () => {
      it('edits an existing user theme', async () => {
        const result = await server.executeOperation({
          query: EditThemeDocument,
          variables: {
            userId: `${newPortalUser.userId}`,
            theme: 'light',
          },
        })

        const expectedData = {
          userId: `${newPortalUser.userId}`,
          theme: 'light',
        }

        expect(result.errors).toBeUndefined()
        expect(result.data).toMatchObject({ editTheme: expectedData })
      })
    })

    describe('addWeatherWidget', () => {
      // Start Data: MySpace contains exampleWeatherWidget2
      // End Data: MySpace contains exampleWeatherWidget1 and exampleWeatherWidget2

      it('adds a weather widget', async () => {
        // Add Weather Widget
        const result = await server.executeOperation({
          query: AddWeatherWidgetDocument,
          variables: {
            userId: `${newPortalUser.userId}`,
            title: 'Weather',
            type: 'Weather',
            zipcode: exampleWeatherWidget1.coords.zipcode,
          },
        })

        const expectedData = {
          _id: expect.any(String),
          title: 'Weather',
          type: 'Weather',
          coords: {
            ...exampleWeatherWidget1.coords,
          },
        }

        expect(result.errors).toBeUndefined()
        expect(result.data).toMatchObject({ addWeatherWidget: expectedData })
      })
    })

    describe('editWeatherWidget', () => {
      it('edits an existing weather widget', async () => {
        // Start Data: MySpace contains exampleWeatherWidget1 and exampleWeatherWidget2
        // End Data: exampleWeatherWidget2 is updated to 90210 (exampleWeatherWidget1 data))
        const mySpace = await server.executeOperation({
          query: GetMySpaceDocument,
          variables: {
            userId: newPortalUser.userId,
          },
        })

        const result = await server.executeOperation({
          query: EditWeatherWidgetDocument,
          variables: {
            _id: mySpace.data?.mySpace[2]._id,
            zipcode: exampleWeatherWidget1.coords.zipcode,
          },
        })
        const expectedData = {
          _id: mySpace.data?.mySpace[2]._id,
          title: 'Weather',
          coords: {
            ...exampleWeatherWidget1.coords,
          },
        }
        expect(result.errors).toBeUndefined()
        expect(result.data).toMatchObject({ editWeatherWidget: expectedData })
      })
    })
  })
})
