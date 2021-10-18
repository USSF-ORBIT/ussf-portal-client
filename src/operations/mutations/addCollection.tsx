import { gql, useMutation, MutationHookOptions } from '@apollo/client'
import type { Bookmark } from 'types'

interface AddCollectionResponse {
  id: string
  title: string
  bookmarks: Bookmark[]
}

interface AddCollectionInput {
  title: string
  bookmarks: Bookmark[]
}

export const ADD_COLLECTION = gql`
  mutation addCollection($title: String, $bookmarks: [Bookmark]) {
    addCollection(title: $title, bookmarks: $bookmarks) @client
  }
`

export function useAddCollectionMutation(
  options?: MutationHookOptions<AddCollectionResponse, AddCollectionInput>
) {
  return useMutation<AddCollectionResponse, AddCollectionInput>(
    ADD_COLLECTION,
    options
  )
}
