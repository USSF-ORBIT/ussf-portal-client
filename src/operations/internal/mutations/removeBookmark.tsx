import { gql, useMutation } from '@apollo/client'
import type { ObjectId } from 'bson'

interface RemoveBookmarkResponse {
  _id: ObjectId
  cmsId?: string
  isRemoved?: boolean
}

interface RemoveBookmarkInput {
  collectionId: ObjectId
  _id: ObjectId
  cmsId?: string
}

export const REMOVE_BOOKMARK = gql`
  mutation removeBookmark($_id: OID!, $collectionId: OID!, $cmsId: ID) {
    removeBookmark(_id: $_id, collectionId: $collectionId, cmsId: $cmsId) {
      _id
    }
  }
`
export function useRemoveBookmarkMutation() {
  return useMutation<RemoveBookmarkResponse, RemoveBookmarkInput>(
    REMOVE_BOOKMARK
  )
}
