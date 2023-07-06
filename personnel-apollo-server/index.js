import { ApolloServer } from '@apollo/server'
// import { startStandaloneServer } from '@apollo/server/standalone'

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

await server.listen(4000)
