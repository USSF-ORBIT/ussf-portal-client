import { gql, useMutation } from '@apollo/client'
import {
  AddCollectionMutationResult,
  AddCollectionMutationVariables,
} from '../../../generated/graphql'

export const ADD_COLLECTION = gql`
  mutation addCollection($title: String!, $bookmarks: [BookmarkInput!]!) {
    addCollection(title: $title, bookmarks: $bookmarks) {
      _id
      title
      bookmarks {
        _id
        url
        label
        cmsId
      }
    }
  }
`

export function useAddCollectionMutation() {
  return useMutation<
    AddCollectionMutationResult,
    AddCollectionMutationVariables
  >(ADD_COLLECTION)
}
