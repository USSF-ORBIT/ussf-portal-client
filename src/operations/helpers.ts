import type { AddCollectionsMutationVariables } from './portal/mutations/addCollections.g'
import type { BookmarkRecord, CollectionRecord } from 'types/index'

// Map Keystone Collection Record to Portal Collection
// Used to prep data for gql mutation, so we return type AddCollectionsMutationVariables
export const addCollectionsInput = (
  c: CollectionRecord[]
): AddCollectionsMutationVariables => ({
  collections: c.map(({ id, title, bookmarks }) => {
    return {
      id,
      title,
      bookmarks: bookmarks.map(({ id, url, label }): BookmarkRecord => {
        return { id, url, label }
      }),
    }
  }),
})
