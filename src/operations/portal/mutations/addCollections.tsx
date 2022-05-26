import { useMutation } from '@apollo/client'

import {
  AddCollectionsDocument,
  BookmarkRecordInput,
  CollectionRecord,
  CollectionRecordInput,
  AddCollectionMutationResult,
  AddCollectionsMutationVariables,
} from 'types/index'

// Map Keystone Collection Record to Portal Collection
export const addCollectionsInput = (
  c: CollectionRecord[]
): CollectionRecordInput[] => {
  return c.map(({ id, title, bookmarks }) => {
    return {
      id,
      title,
      bookmarks: bookmarks.map(({ id, url, label }): BookmarkRecordInput => {
        return { id, url, label }
      }),
    }
  })
}

export function useAddCollectionsMutation() {
  return useMutation<
    AddCollectionMutationResult,
    AddCollectionsMutationVariables
  >(AddCollectionsDocument)
}
