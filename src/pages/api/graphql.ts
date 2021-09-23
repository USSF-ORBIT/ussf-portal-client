import { ServerResponse } from 'http'

import { MicroRequest } from 'apollo-server-micro/dist/types'

import { ApolloServer, gql } from 'apollo-server-micro'
import type { PageConfig } from 'next'
import type { Resolvers } from '@apollo/client'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

export const config: PageConfig = {
  api: { bodyParser: false },
}

const schema = gql`
  type Query {
    hello: String!
  }
`

const resolvers: Resolvers = {
  Query: {
    hello: (_parent, _args, _context) => 'world!',
  },
}

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
})

const startServer = apolloServer.start()

export default async function handler(req: MicroRequest, res: ServerResponse) {
  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}
