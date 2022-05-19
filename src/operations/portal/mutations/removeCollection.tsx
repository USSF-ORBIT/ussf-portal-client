import { gql, useMutation } from '@apollo/client'
import {
  RemoveCollectionMutationResult,
  RemoveCollectionMutationVariables,
} from 'generated/graphql'
export const REMOVE_COLLECTION = gql`
  mutation removeCollection($_id: OID!) {
    removeCollection(_id: $_id) {
      _id
    }
  }
`

export function useRemoveCollectionMutation() {
  return useMutation<
    RemoveCollectionMutationResult,
    RemoveCollectionMutationVariables
  >(REMOVE_COLLECTION)
}
