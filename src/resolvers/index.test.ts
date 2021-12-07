import { MongoClient, Db } from 'mongodb'
import { ApolloServer } from 'apollo-server-micro'

import { typeDefs } from '../schema'
import { GET_COLLECTIONS } from '../operations/queries/getCollections'

import resolvers from './index'

let server: ApolloServer
let connection: typeof MongoClient
let db: typeof Db

describe('GraphQL resolvers', () => {
  describe('without being logged in', () => {
    beforeAll(async () => {
      connection = await MongoClient.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      db = await connection.db()

      server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({
          db,
          user: undefined,
        }),
      })
    })

    afterAll(async () => {
      await connection.close()
    })

    it('getCollections returns an authentication error', async () => {
      const result = await server.executeOperation({
        query: GET_COLLECTIONS,
      })

      expect(result.errors).toHaveLength(1)

      if (result.errors?.length) {
        expect(result.errors[0].message).toEqual(
          'You must be logged in to perform this operation'
        )
        expect(result.errors[0].extensions?.code).toEqual('UNAUTHENTICATED')
      }
    })
  })

  describe('while logged in', () => {
    beforeAll(async () => {
      connection = await MongoClient.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      db = await connection.db()

      server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({
          db,
          user: {
            nameID: 'testUserID',
          },
        }),
      })
    })

    afterAll(async () => {
      await connection.close()
    })

    describe('getCollections', () => {
      it('returns all collections', async () => {
        const result = await server.executeOperation({
          query: GET_COLLECTIONS,
        })

        console.log('result', result.data)

        expect(result.errors).toBeUndefined()
      })
    })
  })
})
