import { gql, useMutation } from '@apollo/client'
import { Bookmark } from 'types'

interface RemoveBookmarkResponse {
  collectionId: string
  collectionTitle: string
  bookmarks: Bookmark[]
}

interface RemoveBookmarkInput {
  collectionId: string
  id: string
}

export const REMOVE_BOOKMARK = gql`
  mutation removeBookmark($id: ID!, $collectionId: ID!) @client {
    removeBookmark(id: $id, collectionId: $collectionId)
  }
`
export function useRemoveBookmarkMutation() {
  return useMutation<RemoveBookmarkResponse, RemoveBookmarkInput>(
    REMOVE_BOOKMARK
  )
}
