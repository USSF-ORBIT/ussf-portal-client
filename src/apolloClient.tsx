import { ApolloClient, InMemoryCache } from '@apollo/client'
import { v4 } from 'uuid'

import { typeDefs } from './schema'

import type { Collection } from 'types'
import { GET_COLLECTIONS } from 'operations/queries/getCollections'
import { localResolvers } from 'operations/resolvers'

// Initialize cache
export const initCache = () => {
  const cache = new InMemoryCache()
  cache.writeQuery({
    query: GET_COLLECTIONS,
    data: {
      collections: [],
    },
  })

  // Seed cache with initial collection
  const exampleCollection: Collection = {
    __typename: 'Collection',
    id: v4(),
    title: 'Example Collection',
    bookmarks: [
      {
        __typename: 'Bookmark',
        id: v4(),
        url: 'https://google.com',
        label: 'Webmail',
        description: 'Lorem ipsum',
      },
      {
        __typename: 'Bookmark',
        id: v4(),
        url: 'https://mypay.dfas.mil/#/',
        label: 'MyPay',
        description: 'Lorem ipsum',
      },
      {
        __typename: 'Bookmark',
        id: v4(),
        url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
        label: 'vMPF',
        description: 'Lorem ipsum',
      },
      {
        __typename: 'Bookmark',
        id: v4(),
        url: 'https://leave.af.mil/profile',
        label: 'LeaveWeb',
        description: 'Lorem ipsum',
      },
      {
        __typename: 'Bookmark',
        id: v4(),
        url: 'https://www.e-publishing.af.mil/',
        label: 'e-Publications',
        description: 'Lorem ipsum',
      },
    ],
  }

  cache.writeQuery({
    query: GET_COLLECTIONS,
    data: {
      collections: [exampleCollection],
    },
  })
  return cache
}

// Set up client with persisted cache and local resolvers
export const client = new ApolloClient({
  cache: initCache(),
  resolvers: localResolvers,
  typeDefs,
})
