import { MongoClient, Db, ObjectId } from 'mongodb'
import { ApolloServer } from '@apollo/server'
import { VariableValues } from '@apollo/server/dist/esm/externalTypes/graphql'
import { typeDefs } from '../schema'
import { newPortalUser } from '../__fixtures__/newPortalUser'
import resolvers from './index'
import { testUser1 } from '__fixtures__/authUsers'
import type {
  Collection,
  MySpaceWidget,
  SingleGraphQLResponse,
  User,
  WeatherWidget,
  ServerContext,
} from 'types'
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
import PersonnelAPI from 'pages/api/dataSources/personnel'

let server: ApolloServer<ServerContext>
let serverContext: ServerContext
let connection: typeof MongoClient
let db: typeof Db
const testCollectionId = ObjectId()
const testBookmarkId = ObjectId()
const testWidgetId = ObjectId()

let keystoneAPI: KeystoneAPI
let weatherAPI: WeatherAPI
let personnelAPI: PersonnelAPI

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
      server = new ApolloServer<ServerContext>({
        typeDefs,
        resolvers,
      })
    })

    test.each([
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
      'the %s operation returns an authentication errors',
      async (_name, op, variables: VariableValues = {}) => {
        const {
          body: {
            singleResult: { errors },
          },
        } = (await server.executeOperation({
          query: op,
          variables,
        })) as SingleGraphQLResponse<any>

        expect(errors).toHaveLength(1)
        expect(errors?.[0].extensions?.code).toEqual('UNAUTHENTICATED')
        expect(errors?.[0].message).toEqual(
          'You must be logged in to perform this operation'
        )
      }
    )
  })

  describe('while logged in', () => {
    beforeAll(async () => {
      // Create a new server instance
      server = new ApolloServer<ServerContext>({
        typeDefs,
        resolvers,
      })
      const { cache } = server
      // Set up dataSources and mock their methods
      keystoneAPI = new KeystoneAPI({ cache })
      weatherAPI = new WeatherAPI({ cache })
      personnelAPI = new PersonnelAPI({ cache })

      keystoneAPI.getLatLong = jest.fn(async () => {
        return {
          ...mockKeystoneAPIData,
          loading: false,
          errors: [],
        }
      })

      weatherAPI.getGridData = jest.fn(async () => {
        return {
          ...mockWeatherAPIData,
          loading: false,
          errors: [],
        }
      })

      // Define the server context
      // We need to pass this context into each server operation
      serverContext = {
        db,
        user: testUser1,
        dataSources: {
          keystoneAPI: keystoneAPI,
          weatherAPI: weatherAPI,
          personnelAPI: personnelAPI,
        },
      }
    })

    beforeEach(async () => {
      // Reset db before each test
      await db.collection('users').deleteMany({})
      await db.collection('users').insertOne(newPortalUser)
    })

    describe('getMySpace', () => {
      type ResponseData = {
        mySpace: MySpaceWidget[]
      }

      test('returns all widgets for the logged in user', async () => {
        const {
          body: {
            singleResult: { data, errors },
          },
        } = (await server.executeOperation<ResponseData>(
          { query: GetMySpaceDocument },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

        const expectedData = { ...newPortalUser }

        expect(errors).toBeUndefined()
        expect(JSON.stringify(data)).toEqual(
          JSON.stringify({ mySpace: expectedData.mySpace })
        )
      })
    })

    describe('getCollections', () => {
      type ResponseData = {
        collections: Collection[]
      }

      test('returns all collections for the logged in user', async () => {
        const {
          body: {
            singleResult: { data, errors },
          },
        } = (await server.executeOperation(
          { query: GetCollectionsDocument },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

        expect(errors).toBeUndefined()
        const expectedData = newPortalUser.mySpace.filter(
          (w) => w.type === 'Collection'
        )

        expect(JSON.stringify(data?.collections)).toEqual(
          JSON.stringify(expectedData)
        )
      })
    })

    describe('addWidget', () => {
      type ResponseData = {
        addWidget: MySpaceWidget
      }

      test('adds a new News widget to the user’s My Space', async () => {
        const {
          body: {
            singleResult: { data, errors },
          },
        } = (await server.executeOperation(
          {
            query: AddWidgetDocument,
            variables: {
              title: 'Recent news',
              type: 'News',
            },
          },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

        expect(errors).toBeUndefined()

        const expectedData = {
          _id: expect.any(String),
          title: 'Recent news',
          type: 'News',
        }

        expect(data).toMatchObject({ addWidget: expectedData })
      })

      test('adds a new FeaturedShortcuts widget to the user’s My Space', async () => {
        const {
          body: {
            singleResult: { data, errors },
          },
        } = (await server.executeOperation(
          {
            query: AddWidgetDocument,
            variables: {
              title: 'Featured Shortcuts',
              type: 'FeaturedShortcuts',
            },
          },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

        const expectedData = {
          _id: expect.any(String),
          title: 'Featured Shortcuts',
          type: 'FeaturedShortcuts',
        }

        expect(errors).toBeUndefined()
        expect(data).toMatchObject({ addWidget: expectedData })
      })

      test('adds a new GuardianIdeal widget to the user’s My Space', async () => {
        const {
          body: {
            singleResult: { data, errors },
          },
        } = (await server.executeOperation(
          {
            query: AddWidgetDocument,
            variables: {
              title: 'Guardian Ideal',
              type: 'GuardianIdeal',
            },
          },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

        expect(errors).toBeUndefined()

        const expectedData = {
          _id: expect.any(String),
          title: 'Guardian Ideal',
          type: 'GuardianIdeal',
        }

        expect(data).toMatchObject({ addWidget: expectedData })
      })
    })

    describe('removeWidget', () => {
      type ResponseData = {
        removeWidget: MySpaceWidget
      }
      test('returns an errors if a non-string id is passed', async () => {
        const testWidgetId = ObjectId()

        const {
          body: {
            singleResult: { errors },
          },
        } = (await server.executeOperation(
          {
            query: RemoveWidgetDocument,
            variables: {
              _id: testWidgetId,
            },
          },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

        expect(errors).toHaveLength(1)
        expect(errors?.[0].message).toContain(
          'ObjectIdScalar can only parse string values'
        )
      })
      test('removes an existing widget from the user’s My Space', async () => {
        const testWidgetId = ObjectId()

        const {
          body: {
            singleResult: { data, errors },
          },
        } = (await server.executeOperation(
          {
            query: RemoveWidgetDocument,
            variables: {
              _id: `${testWidgetId}`,
            },
          },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

        expect(errors).toBeUndefined()

        const expectedData = {
          _id: `${testWidgetId}`,
        }

        expect(data).toMatchObject({ removeWidget: expectedData })
      })
    })

    describe('addCollection', () => {
      type ResponseData = {
        addCollection: Collection
      }
      test('adds a new collection to the user’s My Space', async () => {
        const {
          body: {
            singleResult: { data, errors },
          },
        } = (await server.executeOperation(
          {
            query: AddCollectionDocument,
            variables: {
              title: '',
              bookmarks: [],
            },
          },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

        expect(errors).toBeUndefined()

        const expectedData = {
          _id: expect.any(String),
          title: '',
          bookmarks: [],
        }

        expect(data).toMatchObject({ addCollection: expectedData })
      })
    })

    describe('editCollection', () => {
      type ResponseData = {
        editCollection: Collection
      }
      test('edits an existing collection title', async () => {
        const editCollection = newPortalUser.mySpace.find(
          (w) => w.type === 'Collection'
        )

        const {
          body: {
            singleResult: { data, errors },
          },
        } = (await server.executeOperation(
          {
            query: EditCollectionDocument,
            variables: {
              _id: `${editCollection?._id}`,
              title: 'Edited Collection Title',
            },
          },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

        expect(errors).toBeUndefined()

        const expectedData = {
          _id: `${editCollection?._id}`,
          title: 'Edited Collection Title',
        }

        expect(data).toMatchObject({ editCollection: expectedData })
      })

      test('edits the order of bookmarks in a collection', async () => {
        const editCollection = newPortalUser.mySpace.find(
          (w) => w.type === 'Collection'
        )

        expect(editCollection?.bookmarks?.[0].label).toEqual('Webmail')

        // Reorder bookmarks in collection
        const {
          body: {
            singleResult: { data, errors },
          },
        } = (await server.executeOperation(
          {
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
          },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

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
        expect(errors).toBeUndefined()
        expect(data).toMatchObject({
          editCollection: expectedFirst,
        })

        // Reorder bookmarks in collection to match original order
        const {
          body: {
            singleResult: { data: secondData, errors: secondErrors },
          },
        } = (await server.executeOperation(
          {
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
          },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

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

        expect(secondErrors).toBeUndefined()
        expect(secondData).toMatchObject({
          editCollection: expectedSecond,
        })
      })
    })

    describe('removeCollection', () => {
      type ResponseData = {
        removeCollection: Collection
      }
      test('deletes an existing collection', async () => {
        const removeCollection = newPortalUser.mySpace.find(
          (w) => w.type === 'Collection'
        )

        const {
          body: {
            singleResult: { data, errors },
          },
        } = (await server.executeOperation(
          {
            query: RemoveCollectionDocument,
            variables: {
              _id: `${removeCollection?._id}`,
            },
          },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

        const expectedData = {
          _id: `${removeCollection?._id}`,
        }
        expect(errors).toBeUndefined()
        expect(data).toMatchObject({ removeCollection: expectedData })
      })
    })

    describe('addCollections', () => {
      type ResponseData = {
        addCollections: Collection[]
      }

      test('adds multiple new collections to the user’s My Space', async () => {
        const {
          body: {
            singleResult: { data, errors },
          },
        } = (await server.executeOperation(
          {
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
          },
          {
            contextValue: serverContext,
          }
        )) as SingleGraphQLResponse<ResponseData>

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

        expect(errors).toBeUndefined()
        expect(data).toMatchObject({ addCollections: expectedData })
      })
    })

    describe('addBookmark', () => {
      type ResponseData = {
        addBookmark: Collection
      }

      test('adds a bookmark to an existing collection', async () => {
        const collection = newPortalUser.mySpace[0]

        const {
          body: {
            singleResult: { data, errors },
          },
        } = (await server.executeOperation(
          {
            query: AddBookmarkDocument,
            variables: {
              collectionId: `${collection._id}`,
              label: 'New Label',
              url: 'http://www.example.com/new',
              cmsId: 'testBookmarkCmsId',
            },
          },
          {
            contextValue: serverContext,
          }
        )) as SingleGraphQLResponse<ResponseData>

        const expectedData = {
          _id: expect.any(String),
          label: 'New Label',
          url: 'http://www.example.com/new',
          cmsId: 'testBookmarkCmsId',
        }

        expect(errors).toBeUndefined()
        expect(data).toMatchObject({ addBookmark: expectedData })
      })
    })

    describe('editBookmark', () => {
      type ResponseData = {
        editBookmark: Collection
      }

      test('edits an existing bookmark', async () => {
        const collection = newPortalUser.mySpace[0]
        const editBookmark = collection.bookmarks?.filter(
          (b: any) => b.cmsId === null
        )[0]

        const {
          body: {
            singleResult: { data, errors },
          },
        } = (await server.executeOperation(
          {
            query: EditBookmarkDocument,
            variables: {
              _id: `${editBookmark?._id}`,
              collectionId: `${newPortalUser.mySpace[0]._id}`,
              label: 'New Label',
              url: 'http://www.example.com/new',
            },
          },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

        const expectedData = {
          _id: `${editBookmark?._id}`,
          label: 'New Label',
          url: 'http://www.example.com/new',
        }

        expect(errors).toBeUndefined()
        expect(JSON.stringify(data)).toEqual(
          JSON.stringify({ editBookmark: expectedData })
        )
      })
    })

    describe('removeBookmark', () => {
      type ResponseData = {
        removeBookmark: Collection
      }

      test('deletes an existing custom bookmark', async () => {
        const collection = newPortalUser.mySpace[0]
        const bookmark = collection.bookmarks?.[0]

        const {
          body: {
            singleResult: { data, errors },
          },
        } = (await server.executeOperation(
          {
            query: RemoveBookmarkDocument,
            variables: {
              _id: `${bookmark?._id}`,
              collectionId: `${collection?._id}`,
            },
          },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

        const expectedData = {
          _id: `${bookmark?._id}`,
        }
        expect(errors).toBeUndefined()
        expect(data).toMatchObject({ removeBookmark: expectedData })
      })

      test('hides an existing cms bookmark', async () => {
        type ResponseData = {
          mySpace: MySpaceWidget[]
        }

        const collection = newPortalUser.mySpace[0]
        const bookmark = collection.bookmarks?.[0]

        ;(await server.executeOperation(
          {
            query: RemoveBookmarkDocument,
            variables: {
              _id: `${bookmark?._id}`,
              cmsId: `${bookmark?.cmsId}`,
              collectionId: `${collection?._id}`,
            },
          },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

        const {
          body: {
            singleResult: { data, errors },
          },
        } = (await server.executeOperation(
          {
            query: GetMySpaceDocument,
            variables: {
              userId: newPortalUser.userId,
            },
          },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

        expect(errors).toBeUndefined()
        expect(data.mySpace[0].bookmarks?.[0].cmsId).toBe(bookmark?.cmsId)
        expect(data.mySpace[0].bookmarks?.[0].isRemoved).toBe(true)
      })
    })

    describe('getDisplayName', () => {
      type ResponseData = {
        displayName: string
      }
      test('returns displayName of the user', async () => {
        const {
          body: {
            singleResult: { data, errors },
          },
        } = (await server.executeOperation(
          {
            query: GetDisplayNameDocument,
          },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

        const expectedData = { ...newPortalUser }

        expect(errors).toBeUndefined()
        expect(data?.displayName).toEqual(expectedData.displayName)
      })
    })

    describe('editDisplayName', () => {
      type ResponseData = {
        editDisplayName: User
      }

      test('edits an existing display name', async () => {
        const editDisplayName = newPortalUser

        const {
          body: {
            singleResult: { data, errors },
          },
        } = (await server.executeOperation(
          {
            query: EditDisplayNameDocument,
            variables: {
              userId: `${editDisplayName.userId}`,
              displayName: 'New Name',
            },
          },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

        const expectedData = {
          userId: `${newPortalUser.userId}`,
          displayName: 'New Name',
        }

        expect(errors).toBeUndefined()
        expect(data).toMatchObject({ editDisplayName: expectedData })
      })
    })

    describe('getTheme', () => {
      type ResponseData = {
        theme: string
      }
      test('returns theme of the user', async () => {
        const {
          body: {
            singleResult: { data, errors },
          },
        } = (await server.executeOperation(
          {
            query: GetThemeDocument,
          },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

        const expectedData = { ...newPortalUser }

        expect(errors).toBeUndefined()
        expect(data?.theme).toEqual(expectedData.theme)
      })
    })

    describe('editTheme', () => {
      type ResponseData = {
        editTheme: User
      }
      test('edits an existing user theme', async () => {
        const {
          body: {
            singleResult: { data, errors },
          },
        } = (await server.executeOperation(
          {
            query: EditThemeDocument,
            variables: {
              userId: `${newPortalUser.userId}`,
              theme: 'light',
            },
          },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

        const expectedData = {
          userId: `${newPortalUser.userId}`,
          theme: 'light',
        }

        expect(errors).toBeUndefined()
        expect(data).toMatchObject({ editTheme: expectedData })
      })
    })

    describe('addWeatherWidget', () => {
      // Start Data: MySpace contains exampleWeatherWidget2
      // End Data: MySpace contains exampleWeatherWidget1 and exampleWeatherWidget2
      type ResponseData = {
        addWeatherWidget: WeatherWidget
      }
      test('adds a weather widget', async () => {
        // Add Weather Widget
        const {
          body: {
            singleResult: { data, errors },
          },
        } = (await server.executeOperation(
          {
            query: AddWeatherWidgetDocument,
            variables: {
              userId: `${newPortalUser.userId}`,
              title: 'Weather',
              type: 'Weather',
              zipcode: exampleWeatherWidget1.coords.zipcode,
            },
          },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

        const expectedData = {
          _id: expect.any(String),
          title: 'Weather',
          type: 'Weather',
          coords: {
            ...exampleWeatherWidget1.coords,
          },
        }
        expect(errors).toBeUndefined()
        expect(data).toMatchObject({ addWeatherWidget: expectedData })
      })
    })

    describe('edtestWeatherWidget', () => {
      type ResponseData = {
        editWeatherWidget: WeatherWidget
      }
      test('edits an existing weather widget', async () => {
        // Start Data: MySpace contains exampleWeatherWidget1 and exampleWeatherWidget2
        // End Data: exampleWeatherWidget2 is updated to 90210 (exampleWeatherWidget1 data))
        type MySpaceResponseData = {
          mySpace: MySpaceWidget[]
        }
        const {
          body: {
            singleResult: { data: mySpaceData, errors: mySpaceErrors },
          },
        } = (await server.executeOperation(
          {
            query: GetMySpaceDocument,
            variables: {
              userId: newPortalUser.userId,
            },
          },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<MySpaceResponseData>

        expect(mySpaceErrors).toBeUndefined()

        const {
          body: {
            singleResult: { data, errors },
          },
        } = (await server.executeOperation(
          {
            query: EditWeatherWidgetDocument,
            variables: {
              _id: mySpaceData.mySpace[2]._id,
              zipcode: exampleWeatherWidget1.coords.zipcode,
            },
          },
          { contextValue: serverContext }
        )) as SingleGraphQLResponse<ResponseData>

        const expectedData = {
          _id: mySpaceData.mySpace[2]._id,
          title: 'Weather',
          coords: {
            ...exampleWeatherWidget1.coords,
          },
        }

        expect(errors).toBeUndefined()
        expect(data).toMatchObject({ editWeatherWidget: expectedData })
      })
    })
  })
})
