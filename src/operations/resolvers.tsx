import { Resolvers, gql } from '@apollo/client'
import { v4 } from 'uuid'

import { GET_COLLECTIONS } from './queries/getCollections'
import type { Bookmark, Collection } from 'types'

export const localResolvers: Resolvers = {
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
    addCollections: (_root, { collections }, { cache }) => {
      const previous = cache.readQuery({
        query: GET_COLLECTIONS,
      })

      const newCollections = collections.map((collection: Collection) => ({
        id: v4(),
        title: collection.title,
        bookmarks: collection.bookmarks.map((bookmark) => ({
          __typename: 'Bookmark',
          description: '',
          ...bookmark,
        })),
        __typename: 'Collection',
      }))

      const data = {
        collections:
          previous.collections.length !== 0
            ? [...previous.collections, ...newCollections]
            : [...newCollections],
      }

      cache.writeQuery({ query: GET_COLLECTIONS, data })
      return newCollections
    },
    editCollection: (_root, { id, title }, { cache, getCacheKey }) => {
      const queryFragment = gql`
        fragment UpdatedCollection on Collection {
          id
          title
        }
      `

      const cacheId = getCacheKey({
        __typename: 'Collection',
        id: id,
      })

      cache.writeFragment({
        id: cacheId,
        fragment: queryFragment,
        data: {
          id,
          title,
        },
      })

      const updatedCollection = cache.readFragment({
        id: cacheId,
        fragment: queryFragment,
      })

      return updatedCollection
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
      { url, label = '', description = '', collectionId },
      { cache, getCacheKey }
    ) => {
      const queryFragment = gql`
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
      `

      // Get the cache id for the collection we're adding to
      const cacheId = getCacheKey({
        __typename: 'Collection',
        id: collectionId,
      })

      const collection = cache.readFragment({
        id: cacheId,
        fragment: queryFragment,
      })

      // Create new bookmark and structure data
      const newBookmark = {
        id: v4(),
        url,
        label,
        description,
        __typename: 'Bookmark',
      }

      cache.writeFragment({
        id: cacheId,
        fragment: queryFragment,
        data: {
          ...collection,
          bookmarks: [...collection.bookmarks, newBookmark],
        },
      })

      return collection
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
