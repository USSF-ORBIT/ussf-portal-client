// Ignore the next two lines until we make more updates
// eslint-disable-next-line
import { ApolloServer } from '@apollo/server'
// eslint-disable-next-line
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `#graphql
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

await startStandaloneServer(server, { listen: 4000 })
