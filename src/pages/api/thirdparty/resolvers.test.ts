import { ApolloServer } from '@apollo/server'
import { gql } from 'graphql-tag'
import { MongoClient, Db } from 'mongodb'
import ThirdPartyKeystoneAPI from './dataSources/thirdPartyKeystone'
import { resolvers, ThirdPartyContext } from './resolvers'
import { typeDefs } from './schema'
import type { SingleGraphQLResponse } from 'types'
import { newPortalUser } from '__fixtures__/newPortalUser'
let server: ApolloServer<ThirdPartyContext>
let serverContext: ThirdPartyContext
let keystoneAPI: ThirdPartyKeystoneAPI
let connection: typeof MongoClient
let db: typeof Db

describe('GraphQL resolvers', () => {
  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    db = await connection.db()

    await db.collection('users').insertOne(newPortalUser)
  })

  afterAll(async () => {
    await connection.close()
  })
  beforeEach(() => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
    })

    const { cache } = server
    keystoneAPI = new ThirdPartyKeystoneAPI({ cache })

    keystoneAPI.getCNotes = jest.fn(async () => {
      return testCNote
    })

    serverContext = {
      dataSources: {
        keystoneAPI,
        mongodb: db,
      },
    }
  })
  describe('Query.cNotes', () => {
    type ResponseData = {
      cNotes: {
        id: string
        title: string
        publishedDate: string
        body: {
          document: {
            type: string
            children: {
              text: string
            }[]
          }[]
        }
      }[]
    }

    test('returns all articles tagged with C-Note', async () => {
      const {
        body: {
          singleResult: { data, errors },
        },
      } = (await server.executeOperation<ResponseData>(
        { query: cNotesQuery },
        { contextValue: serverContext }
      )) as SingleGraphQLResponse<ResponseData>

      expect(errors).toBeUndefined()
      expect(data.cNotes).toHaveLength(1)
      expect(data.cNotes[0].title).toEqual('Test Article')
    })
  })

  describe('Query.displayName', () => {
    type ResponseData = {
      displayName: string
    }

    test("does not return the user's display name if unauthenticated", async () => {
      const {
        body: {
          singleResult: { errors },
        },
      } = (await server.executeOperation<ResponseData>(
        { query: displayNameQuery },
        { contextValue: serverContext }
      )) as SingleGraphQLResponse<ResponseData>

      expect(errors).toHaveLength(1)
    })

    test("returns the user's display name if authenticated", async () => {
      const {
        body: {
          singleResult: { data, errors },
        },
      } = (await server.executeOperation<ResponseData>(
        {
          query: displayNameQuery,
        },
        {
          contextValue: {
            ...serverContext,
            userId: newPortalUser.userId,
          },
        }
      )) as SingleGraphQLResponse<ResponseData>

      expect(errors).toBeUndefined()
      expect(data.displayName).toEqual('BERNADETTE CAMPBELL')
    })
  })
})

// This query is what the third-party calls,
// which is why it's querying for cNotes
const cNotesQuery = gql`
  query GetCNotes {
    cNotes {
      id
      title
      publishedDate
      body {
        document
      }
    }
  }
`

const displayNameQuery = gql`
  query GetDisplayName {
    displayName
  }
`

// This data represents what is returned from
// the keystone API, which is why it's called
// articles instead of cNotes.
const testCNote = {
  data: {
    articles: [
      {
        id: 'cloyw4wk20892ryzvsu2n23hb',
        title: 'Test Article',
        publishedDate: '2023-11-14T22:14:14.283Z',
        tags: [
          {
            name: 'C-Note',
          },
        ],
        body: {
          document: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Lorem ipsum body text',
                },
              ],
            },
          ],
        },
      },
    ],
  },
}
