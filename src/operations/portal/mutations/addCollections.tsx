import { useMutation } from '@apollo/client'
import {
  AddCollectionsDocument,
  AddCollectionMutationResult,
  AddCollectionsMutationVariables,
} from '../../../../generated/graphql'
import type {
  BookmarkRecordInput,
  CollectionRecord,
  CollectionRecordInput,
} from 'types'

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
