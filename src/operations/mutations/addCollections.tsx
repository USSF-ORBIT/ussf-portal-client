import { gql, useMutation } from '@apollo/client'
import type {
  BookmarkRecordInput,
  Collection,
  CollectionRecord,
  CollectionRecordInput,
} from 'types'

interface AddCollectionsResponse {
  collections: Collection[]
}

interface AddCollectionsInput {
  collections: CollectionRecordInput[]
}

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

export const ADD_COLLECTIONS = gql`
  mutation addCollections($collections: [CollectionRecordInput!]!) {
    addCollections(collections: $collections) {
      _id
      cmsId
      title
      type
      bookmarks {
        _id
        cmsId
        url
        label
      }
    }
  }
`

export function useAddCollectionsMutation() {
  return useMutation<AddCollectionsResponse, AddCollectionsInput>(
    ADD_COLLECTIONS
  )
}
