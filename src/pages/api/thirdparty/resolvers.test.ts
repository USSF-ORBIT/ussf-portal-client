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

    keystoneAPI.getDocuments = jest.fn(async () => {
      return {
        data: {
          documents: [
            {
              id: 'ckwz3u58s1835ql974leo1yll',
              title: 'Test Document',
              description: 'Test Document Description',
              file: {
                filename: 'test.pdf',
                filesize: 123456,
                url: 'https://example.com/test.pdf',
              },
            },
          ],
        },
      }
    })

    keystoneAPI.getInternalNewsArticles = jest.fn(async () => {
      return {
        data: {
          internalNewsArticles: [
            {
              id: 'ckwz3u58s1835ql974leo1yll',
              title: 'Test Internal News Article',
              publishedDate: '2023-11-14T22:14:14.283Z',
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
    })

    keystoneAPI.getLandingPageArticles = jest.fn(async () => {
      return {
        data: {
          landingPageArticles: [
            {
              id: 'ckwz3u58s1835ql974leo1yll',
              title: 'Test Landing Page Article',
              publishedDate: '2023-11-14T22:14:14.283Z',
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

  describe('Query.documents', () => {
    type ResponseData = {
      documents: {
        id: string
        title: string
        description: string
        file: {
          filename: string
          filesize: number
          url: string
        }
      }[]
    }

    test('throws an error if unauthenticated', async () => {
      const {
        body: {
          singleResult: { errors },
        },
      } = (await server.executeOperation(
        {
          query: documentsQuery,
        },
        {
          contextValue: serverContext,
        }
      )) as SingleGraphQLResponse<ResponseData>

      expect(errors).toHaveLength(1)
    })

    test('returns all documents if authenticated', async () => {
      const {
        body: {
          singleResult: { errors },
        },
      } = (await server.executeOperation<ResponseData>(
        {
          query: gql`
            query GetDocuments {
              documents {
                id
                title
                description
                file {
                  filename
                  filesize
                  url
                }
              }
            }
          `,
        },
        {
          contextValue: {
            ...serverContext,
            userId: newPortalUser.userId,
          },
        }
      )) as SingleGraphQLResponse<ResponseData>

      expect(errors).toBeUndefined()
    })
  })

  describe('Query.internalNewsArticles', () => {
    type ResponseData = {
      internalNewsArticles: {
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

    test('throws an error if unauthenticated', async () => {
      const {
        body: {
          singleResult: { errors },
        },
      } = (await server.executeOperation(
        {
          query: internalNewsArticlesQuery,
        },
        {
          contextValue: serverContext,
        }
      )) as SingleGraphQLResponse<ResponseData>

      expect(errors).toHaveLength(1)
    })

    test('returns all internal news articles if authenticated', async () => {
      const {
        body: {
          singleResult: { errors },
        },
      } = (await server.executeOperation<ResponseData>(
        {
          query: internalNewsArticlesQuery,
        },
        {
          contextValue: {
            ...serverContext,
            userId: newPortalUser.userId,
          },
        }
      )) as SingleGraphQLResponse<ResponseData>

      expect(errors).toBeUndefined()
    })
  })

  describe('Query.landingPageArticles', () => {
    type ResponseData = {
      landingPageArticles: {
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

    test('throws an error if unauthenticated', async () => {
      const {
        body: {
          singleResult: { errors },
        },
      } = (await server.executeOperation(
        {
          query: landingPageArticlesQuery,
        },
        {
          contextValue: serverContext,
        }
      )) as SingleGraphQLResponse<ResponseData>

      expect(errors).toHaveLength(1)
    })

    test('returns all landing page articles if authenticated', async () => {
      const {
        body: {
          singleResult: { errors },
        },
      } = (await server.executeOperation<ResponseData>(
        {
          query: landingPageArticlesQuery,
        },
        {
          contextValue: {
            ...serverContext,
            userId: newPortalUser.userId,
          },
        }
      )) as SingleGraphQLResponse<ResponseData>

      expect(errors).toBeUndefined()
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

const documentsQuery = gql`
  query GetDocuments {
    documents {
      id
      title
      description
      file {
        filename
        filesize
        url
      }
    }
  }
`

const internalNewsArticlesQuery = gql`
  query GetInternalNewsArticles {
    internalNewsArticles {
      id
      title
      preview
      publishedDate
      labels {
        id
        name
        type
      }
      body {
        document
      }
      tags {
        name
      }
    }
  }
`

const landingPageArticlesQuery = gql`
  query GetLandingPageArticles {
    landingPageArticles {
      id
      title
      preview
      publishedDate
      labels {
        id
        name
        type
      }
      body {
        document
      }
      tags {
        name
      }
    }
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
