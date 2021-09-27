import { Resolvers, gql } from '@apollo/client'
import { v4 } from 'uuid'

import { GET_COLLECTIONS } from './queries/getCollections'
import type { Bookmark, Collection } from 'types'

export const localResolvers: Resolvers | Resolvers[] = {
  Query: {
    collections: (_root, args, { cache }) => {
      const allCollections = cache.readQuery({
        query: GET_COLLECTIONS,
      })

      return allCollections.collections
    },
  },
  Mutation: {
    addCollection: (_root, { title, bookmarks }, { cache }) => {
      const previous = cache.readQuery({
        query: GET_COLLECTIONS,
      })

      const newCollection = {
        id: v4(),
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
    removeCollection: (_root, { id }, { cache }) => {
      cache.modify({
        fields: {
          collections(collections: Collection[], { readField }: any) {
            return collections.filter(
              (collection) => id !== readField('id', collection)
            )
          },
        },
      })
      return null
    },
    addBookmark: (
      _root,
      { url, label, description, collectionId },
      { cache, getCacheKey }
    ) => {
      // Create new bookmark and structure data
      const newBookmark = {
        id: v4(),
        url,
        label,
        description,
        __typename: 'Bookmark',
      }

      // Get the cache id for the collection we're adding to
      const cacheId = getCacheKey({
        __typename: 'Collection',
        id: collectionId,
      })

      // Store the new bookmark in the cached collection
      cache.modify({
        id: cacheId,
        fields: {
          bookmarks(bookmarks: Bookmark[]) {
            return bookmarks.length !== 0
              ? [...bookmarks, newBookmark]
              : [newBookmark]
          },
        },
      })

      return {
        collectionId,
        ...newBookmark,
      }
    },
    removeBookmark: (_, { id, collectionId }, { cache, getCacheKey }) => {
      // Find collection with the bookmark
      const cacheId = getCacheKey({
        __typename: 'Collection',
        id: collectionId,
      })

      cache.modify({
        id: cacheId,
        fields: {
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          bookmarks(bookmarks: Bookmark[], { readField }: any) {
            return bookmarks.filter(
              (bookmark) => id !== readField('id', bookmark)
            )
          },
        },
      })

      // Return the modified collection
      const collection = cache.readFragment({
        id: cacheId,
        fragment: gql`
          fragment UpdatedCollection on Collection {
            id
            title
            bookmarks {
              id
              url
              label
              description
            }
          }
        `,
      })

      return collection
    },
  },
}
