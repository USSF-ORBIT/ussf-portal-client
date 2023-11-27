import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { GraphQLError } from 'graphql'
import KeystoneAPI from '../dataSources/keystone'
import { resolvers } from './resolvers'
import { typeDefs } from './schema'

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
