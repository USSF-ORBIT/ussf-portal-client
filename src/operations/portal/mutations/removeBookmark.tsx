import { gql, useMutation } from '@apollo/client'
import {
  RemoveBookmarkMutationResult,
  RemoveBookmarkMutationVariables,
} from 'generated/graphql'
export const REMOVE_BOOKMARK = gql`
  mutation removeBookmark($_id: OID!, $collectionId: OID!, $cmsId: ID) {
    removeBookmark(_id: $_id, collectionId: $collectionId, cmsId: $cmsId) {
      _id
    }
  }
`
export function useRemoveBookmarkMutation() {
  return useMutation<
    RemoveBookmarkMutationResult,
    RemoveBookmarkMutationVariables
  >(REMOVE_BOOKMARK)
}
