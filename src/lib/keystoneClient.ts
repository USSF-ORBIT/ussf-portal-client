import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

// Link to Keystone, only called from server

const cmsLink = new HttpLink({
  uri: `${process.env.KEYSTONE_URL}/api/graphql`,
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      // TODO - log error
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })

  if (networkError) {
    // TODO - log error
    console.error(`[Network error]: ${networkError}`)
  }
})

export const client = new ApolloClient({
  link: from([errorLink, cmsLink]),
  cache: new InMemoryCache(),
  credentials: 'include',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
})
