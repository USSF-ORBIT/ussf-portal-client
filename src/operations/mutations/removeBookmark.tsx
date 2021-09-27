import { gql, useMutation } from '@apollo/client'
import { Bookmark } from 'types'
import { GET_COLLECTIONS } from 'operations/queries/getCollections'

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
  mutation removeBookmark($id: ID!, $collectionId: ID!) {
    removeBookmark(id: $id, collectionId: $collectionId) @client
  }
`
export function useRemoveBookmarkMutation() {
  return useMutation<RemoveBookmarkResponse, RemoveBookmarkInput>(
    REMOVE_BOOKMARK,
    {
      refetchQueries: [GET_COLLECTIONS],
    }
  )
}
