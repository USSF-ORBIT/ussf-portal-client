import { gql, useMutation } from '@apollo/client'

interface RemoveBookmarkResponse {
  _id: string
}

interface RemoveBookmarkInput {
  collectionId: string
  _id: string
}

export const REMOVE_BOOKMARK = gql`
  mutation removeBookmark($_id: ID!, $collectionId: ID!) {
    removeBookmark(_id: $_id, collectionId: $collectionId) {
      _id
    }
  }
`
export function useRemoveBookmarkMutation() {
  return useMutation<RemoveBookmarkResponse, RemoveBookmarkInput>(
    REMOVE_BOOKMARK
  )
}
