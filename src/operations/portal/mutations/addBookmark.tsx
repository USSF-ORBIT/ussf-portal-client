import { gql, useMutation } from '@apollo/client'
import {
  AddBookmarkMutationResult,
  AddBookmarkMutationVariables,
} from 'generated/graphql'

export const ADD_BOOKMARK = gql`
  mutation addBookmark(
    $url: String!
    $label: String
    $collectionId: OID!
    $cmsId: ID
  ) {
    addBookmark(
      url: $url
      label: $label
      collectionId: $collectionId
      cmsId: $cmsId
    ) {
      _id
      url
      label
      cmsId
    }
  }
`
export function useAddBookmarkMutation() {
  return useMutation<AddBookmarkMutationResult, AddBookmarkMutationVariables>(
    ADD_BOOKMARK
  )
}
