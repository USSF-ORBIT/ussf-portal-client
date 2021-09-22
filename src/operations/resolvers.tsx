import { Resolvers } from '@apollo/client'
import { v4 } from 'uuid'

import { GET_COLLECTIONS } from './queries/getCollections'
import type { Bookmark, Collection } from 'types'

export const localResolvers: Resolvers | Resolvers[] = {
  Query: {
    collections: (_root, { id }, { cache }) => {
      // Returns either all collections if no id provided,
      // found collection if one matches id,
      // or an empty array

      if (cache === undefined) {
        const err = new Error('Cache is undefined')
        return err
      }

      let collections: Collection[] = []

      const allCollections = cache.readQuery({
        query: GET_COLLECTIONS,
      })

      // We don't have support for graphql errors on
      // the client side, so return an empty array if null
      if (allCollections === null) {
        return collections
      }

      if (id !== undefined) {
        collections = allCollections.collections.filter((c: Collection) => {
          return c.id === id
        })
      } else {
        collections = allCollections.collections
      }

      return collections
    },
  },
  Mutation: {
    addCollection: (_root, { id, title, bookmarks }, { cache }) => {
      const previous = cache.readQuery({
        query: GET_COLLECTIONS,
      })

      const newCollection = {
        id: id,
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
      _root,
      { url, label, description, collectionId },
      { cache }
    ) => {
      // Find collection to add it to
      const allCollections = cache.readQuery({
        query: GET_COLLECTIONS,
      })

      const previous = allCollections.collections.filter((c: Collection) => {
        return c.id === collectionId
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
        id: collectionId,
      })

      cache.modify({
        id: cacheId,
        fields: {
          bookmarks() {
            return updatedBookmarks
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
          bookmarks(bookmarks: Bookmark[], { readField }: any) {
            return bookmarks.filter(
              (bookmark) => id !== readField('id', bookmark)
            )
          },
        },
      })

      return null
    },
  },
}
