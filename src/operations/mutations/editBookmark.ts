import { gql, useMutation } from '@apollo/client'

interface EditBookmarkResponse {
  _id: string
  label: string
  url: string
}

interface EditBookmarkInput {
  _id: string
  collectionId: string
  url?: string
  label?: string
}

export const EDIT_BOOKMARK = gql`
  mutation editBookmark(
    $_id: ID!
    $collectionId: ID!
    $label: String
    $url: String
  ) {
    editBookmark(
      _id: $_id
      collectionId: $collectionId
      label: $label
      url: $url
    ) {
      _id
      label
      url
    }
  }
`

export function useEditBookmarkMutation() {
  return useMutation<EditBookmarkResponse, EditBookmarkInput>(EDIT_BOOKMARK)
}
