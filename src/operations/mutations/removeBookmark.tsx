import { gql, useMutation } from '@apollo/client'

interface RemoveBookmarkResponse {
  _id: string
  cmsId?: string
  isRemoved?: boolean
}

interface RemoveBookmarkInput {
  collectionId: string
  _id: string
  cmsId?: string
}

export const REMOVE_BOOKMARK = gql`
  mutation removeBookmark($_id: ID!, $collectionId: ID!, $cmsId: ID) {
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
