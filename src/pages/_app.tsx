import type { NextPage } from 'next'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'

import '@fortawesome/fontawesome-svg-core/styles.css'
import 'styles/index.scss'
import '../../public/vendor/fontawesome-pro-5.15.1-web/css/all.min.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client'
import '../initIcons'
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist'
import DefaultLayout from 'layout/MVP/DefaultLayout/DefaultLayout'
import { BetaContextProvider } from 'stores/betaContext'
import SeedCache from 'components/SeedCache'
import { GET_COLLECTIONS } from 'operations/queries/getCollections'
import { localResolvers } from 'operations/resolvers'

/* Begin ApolloClient Setup */

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

const typeDefs = gql`
  extend type Query {
    collections: Collection
  }
`

// Set up client with persisted cache and local resolvers
const client = new ApolloClient({
  cache: initCache(),
  resolvers: localResolvers,
  typeDefs,
})

/* End ApolloClient setup */

config.autoAddCss = false

type Page<P = Record<string, never>> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode
}

type Props = AppProps & {
  Component: Page
}

const USSFPortalApp = ({ Component, pageProps }: Props) => {
  const canonicalUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
  const { asPath } = useRouter()

  const getLayout =
    Component.getLayout ||
    ((page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <ApolloProvider client={client}>
      <SeedCache />
      <BetaContextProvider>
        <Head>
          <meta charSet="utf-8" key="charset" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" key="edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
            key="viewport"
          />
          <link rel="canonical" href={canonicalUrl + asPath} />
          <title>Space Force Portal</title>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link
            rel="manifest"
            href="/site.webmanifest"
            crossOrigin="use-credentials"
          />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        {getLayout(<Component {...pageProps} />)}
      </BetaContextProvider>
    </ApolloProvider>
  )
}

export default USSFPortalApp
