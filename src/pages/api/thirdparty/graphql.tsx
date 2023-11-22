import { ApolloServer } from '@apollo/server'
import { DateTime } from 'luxon'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { GraphQLJSON } from 'graphql-type-json'
import { GraphQLError } from 'graphql'
import KeystoneAPI from '../dataSources/keystone'

/* Type Definitions */

/* Data we will return to any third-party querying the API. */
const typeDefs = `
  scalar JSON

  type Article {
    id: ID!
    title: String!
    publishedDate: String!
    tag: String!
    body: Article_body_Document
  }

  type Article_body_Document {
    document(hydrateRelationships: Boolean! = false): JSON!
  }

  type Query {
    articles(tag: String): [Article]
  }
`

/* Resolver Types */
type ArticleInput = {
  publishedDate: string
  tag: string
}

type ThirdPartyContext = {
  dataSources: {
    keystoneAPI: KeystoneAPI
  }
}

/* Resolvers */
const resolvers = {
  // This is a custom scalar type that allows us to return JSON data from our API.
  JSON: GraphQLJSON,
  Query: {
    articles: async (
      _: undefined,
      { tag }: ArticleInput,
      { dataSources: { keystoneAPI } }: ThirdPartyContext
    ) => {
      const {
        data: { articles },
      } = await keystoneAPI.getArticles(DateTime.now(), tag)
      return articles
    },
  },
}

/* Apollo Server */
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

/* Next.js Handler */
export default startServerAndCreateNextHandler(server, {
  context: async () => {
    const { cache } = server
    try {
      return {
        // This server utilizes dataSources to access external APIs, similar to the portal
        // GraphQL server. We're using existing Keystone API data source to avoid duplication.
        dataSources: {
          keystoneAPI: new KeystoneAPI({ cache }),
        },
      }
    } catch (e) {
      console.error('Error creating GraphQL context', e)

      throw new GraphQLError('Error creating GraphQL context', {
        extensions: { code: 'INTERNAL_SERVER_ERROR' },
      })
    }
  },
})
