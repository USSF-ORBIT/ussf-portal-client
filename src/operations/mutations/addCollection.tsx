import { gql, useMutation } from '@apollo/client'
import type { Bookmark } from 'types'

interface AddCollectionResponse {
  id: string
  title: string
  bookmarks: Bookmark[]
}

interface AddCollectionInput {
  id: string
  title: string
  bookmarks: Bookmark[]
}

export const ADD_COLLECTION = gql`
  mutation addCollection($id: ID, $title: String, $bookmarks: [Bookmark]) {
    addCollection(id: $id, title: $title, bookmarks: $bookmarks) @client
  }
`

export function useAddCollectionMutation() {
  return useMutation<AddCollectionResponse, AddCollectionInput>(ADD_COLLECTION)
}
