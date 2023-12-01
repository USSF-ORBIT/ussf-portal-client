import { ApolloServer } from '@apollo/server'
import { gql } from 'graphql-tag'
import ThirdPartyKeystoneAPI from './dataSources/thirdPartyKeystone'
import { resolvers, ThirdPartyContext } from './resolvers'
import { typeDefs } from './schema'
import type { SingleGraphQLResponse } from 'types'

let server: ApolloServer<ThirdPartyContext>
let serverContext: ThirdPartyContext
let keystoneAPI: ThirdPartyKeystoneAPI

describe('GraphQL resolvers', () => {
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
