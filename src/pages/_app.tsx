import type { NextPage } from 'next'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'

import '@fortawesome/fontawesome-svg-core/styles.css'
import 'styles/index.scss'
import '../../public/vendor/fontawesome-pro-5.15.1-web/css/all.min.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { v4 } from 'uuid'
import '../initIcons'
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist'
import DefaultLayout from 'layout/MVP/DefaultLayout/DefaultLayout'
import { BetaContextProvider } from 'stores/betaContext'
import type { Bookmark, Collection } from 'types'
import SeedCache from 'components/SeedCache'
import { GET_COLLECTIONS } from 'operations/queries/getCollections'

/* Begin ApolloClient Setup */

// Initialize and persist cache
const initCache = () => {
  const cache = new InMemoryCache()
  cache.writeQuery({
    query: GET_COLLECTIONS,
    data: {
      collections: [],
    },
  })

  if (typeof window !== 'undefined') {
    persistCache({
      cache,
      storage: new LocalStorageWrapper(window.localStorage),
    })
  }
  return cache
}

// Set up client with persisted cache and local resolvers
// #TODO: Once we set up ApolloServer, remove the local resolvers
const client = new ApolloClient({
  cache: initCache(),

  resolvers: {
    Query: {
      collections: (_, { id }, { cache }) => {
        // Returns either all collections if no id provided,
        // found collection if one matches id,
        // or an empty array
        let collections: Collection[]

        const allCollections = cache.readQuery({ query: GET_COLLECTIONS })

        if (id != null || id !== undefined) {
          collections = allCollections.collections.filter((c: Collection) => {
            return c.id === id
          })
        } else {
          collections = allCollections
        }

        return collections
      },
    },
    Mutation: {
      addCollection: (_, { id, title, bookmarks }, { cache }) => {
        const previous = cache.readQuery({ query: GET_COLLECTIONS })

        const newCollection = {
          id,
          title,
          bookmarks,
          __typename: 'Collection',
        }

        const data = {
          collections:
            previous.collections.length !== 0
              ? [...previous.collections, newCollection]
              : [newCollection],
        }

        cache.writeQuery({ query: GET_COLLECTIONS, data })
        return newCollection
      },
      removeCollection: (_, { id }, { cache }) => {
        const allCollections = cache.readQuery({
          query: GET_COLLECTIONS,
        })

        const filtered = allCollections.collections.filter((c: Collection) => {
          return c.id !== id
        })

        const data = {
          collections: filtered,
        }

        cache.writeQuery({ query: GET_COLLECTIONS, data })
        return filtered
      },
      addBookmark: (
        _,
        { url, label, description, collection_id },
        { cache }
      ) => {
        // Find collection to add it to
        const allCollections = cache.readQuery({
          query: GET_COLLECTIONS,
        })

        const previous = allCollections.collections.filter((c: Collection) => {
          return c.id === collection_id
        })

        // Create new bookmark and structure data
        const newBookmark = {
          id: v4(),
          url,
          label,
          description,
          __typename: 'Bookmark',
        }

        const updatedBookmarks =
          previous[0].bookmarks.length !== 0
            ? [...previous[0].bookmarks, newBookmark]
            : [newBookmark]

        const cacheId = cache.identify({
          __typename: 'Collection',
          id: collection_id,
        })

        cache.modify({
          id: cacheId,
          fields: {
            bookmarks() {
              return updatedBookmarks
            },
          },
        })

        return null
      },
      removeBookmark: (_, { id, collection_id }, { cache }) => {
        // Find collection with the bookmark
        const collection = cache.readQuery({
          query: GET_COLLECTIONS,
          variables: {
            id: collection_id,
          },
        })

        const bookmarks = collection.collections[0].bookmarks
        const updatedBookmarks = bookmarks.filter((b: Bookmark) => {
          return b.id !== id
        })

        cache.modify({
          id: cache.identify({
            __typename: 'Collection',
            id: collection_id,
          }),
          fields: {
            bookmarks() {
              return updatedBookmarks
            },
          },
        })
        return null
      },
    },
  },
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
