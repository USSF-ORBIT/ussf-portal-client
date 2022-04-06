import { gql, useMutation } from '@apollo/client'
import type { ObjectId } from 'bson'

interface EditBookmarkResponse {
  _id: ObjectId
  label: string
  url: string
}

interface EditBookmarkInput {
  _id: ObjectId
  collectionId: ObjectId
  url?: string
  label?: string
}

export const EDIT_BOOKMARK = gql`
  mutation editBookmark(
    $_id: OID!
    $collectionId: OID!
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
