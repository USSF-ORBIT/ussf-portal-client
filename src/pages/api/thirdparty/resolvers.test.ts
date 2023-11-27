import { ApolloServer } from '@apollo/server'
import { gql } from 'graphql-tag'
import KeystoneAPI from '../dataSources/keystone'
import { resolvers, ThirdPartyContext } from './resolvers'
import { typeDefs } from './schema'
import type { SingleGraphQLResponse } from 'types'

let server: ApolloServer<ThirdPartyContext>
let serverContext: ThirdPartyContext
let keystoneAPI: KeystoneAPI

describe('GraphQL resolvers', () => {
  beforeEach(() => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
    })

    const { cache } = server
    keystoneAPI = new KeystoneAPI({ cache })

    keystoneAPI.getArticles = jest.fn(async () => {
      return testCNote
    })

    serverContext = {
      dataSources: {
        keystoneAPI,
      },
    }
  })
  describe('Query.articles', () => {
    type ResponseData = {
      articles: {
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
        { query: articlesQuery, variables: { tag: 'C-Note' } },
        { contextValue: serverContext }
      )) as SingleGraphQLResponse<ResponseData>

      expect(errors).toBeUndefined()
      expect(data.articles).toHaveLength(1)
      expect(data.articles[0].title).toEqual('Test Article')
    })
  })
})

const articlesQuery = gql`
  query GetCNotes($tag: String) {
    articles(tag: $tag) {
      id
      title
      publishedDate
      body {
        document
      }
    }
  }
`

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
