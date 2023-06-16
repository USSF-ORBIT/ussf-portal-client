import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

// Link to internal GraphQL API, only called from client

const portalLink = new HttpLink({
  uri: `/api/graphql`,
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      // TODO - log error
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
      switch (extensions.code) {
        case 'UNAUTHENTICATED':
          window.location.href = '/login'
          break
        case 'SERVER_ERROR':
          window.location.href = '/500'
          break
        default:
          break
      }
    })

  if (networkError) {
    // TODO - log error
    console.error(`[Network error]: ${networkError}`)
  }
})

export const client = new ApolloClient({
  link: from([errorLink, portalLink]),
  cache: new InMemoryCache(),
})
