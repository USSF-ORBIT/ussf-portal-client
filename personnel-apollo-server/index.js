import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
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

server.listen(4000)
