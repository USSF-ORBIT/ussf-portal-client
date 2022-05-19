import { gql, useMutation } from '@apollo/client'
import {
  EditBookmarkMutationResult,
  EditBookmarkMutationVariables,
} from 'generated/graphql'

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
  return useMutation<EditBookmarkMutationResult, EditBookmarkMutationVariables>(
    EDIT_BOOKMARK
  )
}
