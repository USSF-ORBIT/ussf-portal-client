import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
  from,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const portalLink = new HttpLink({
  uri: `/api/graphql`,
})

const cmsLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_KEYSTONE_URL}/api/graphql`,
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      // TODO - log error
      // eslint-disable-next-line no-console
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
    // eslint-disable-next-line no-console
    console.error(`[Network error]: ${networkError}`)
  }
})

export const client = new ApolloClient({
  link: from([
    errorLink,
    ApolloLink.split(
      (operation) => operation.getContext().clientName === 'cms',
      cmsLink,
      portalLink
    ),
  ]),
  cache: new InMemoryCache(),
})
