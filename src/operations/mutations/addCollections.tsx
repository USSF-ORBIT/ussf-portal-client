import { gql, useMutation } from '@apollo/client'
import { WIDGET_TYPES } from 'constants/index'
import type {
  BookmarkRecordInput,
  Collection,
  CollectionRecordInput,
} from 'types'

interface AddCollectionsResponse {
  collections: Collection[]
}

interface AddCollectionsInput {
  collections: CollectionRecordInput[]
}

export const addCollectionsInput = (c: CollectionRecordInput[]) => {
  return c.map(({ id, title, bookmarks }: CollectionRecordInput) => {
    bookmarks = bookmarks.map(({ id, url, label }: BookmarkRecordInput) => {
      return { id, url, label }
    })
    return { id, title, bookmarks, type: WIDGET_TYPES.COLLECTION }
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
