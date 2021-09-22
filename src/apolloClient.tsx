import { ApolloClient, InMemoryCache } from '@apollo/client'
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist'
import { GET_COLLECTIONS } from 'operations/queries/getCollections'
import { localResolvers } from 'operations/resolvers'
import { typeDefs } from 'schema'

// Initialize cache
const initCache = () => {
  const cache = new InMemoryCache()
  cache.writeQuery({
    query: GET_COLLECTIONS,
    data: {
      collections: [],
    },
  })

  // If we have access to the browser, persist the cache in local storage
  if (typeof window !== 'undefined') {
    persistCache({
      cache,
      storage: new LocalStorageWrapper(window.localStorage),
    })
  }
  return cache
}

// Set up client with persisted cache and local resolvers
export const client = new ApolloClient({
  cache: initCache(),
  resolvers: localResolvers,
  typeDefs,
})
