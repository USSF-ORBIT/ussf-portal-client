import { useMutation } from '@apollo/client'
import {
  RemoveCollectionDocument,
  RemoveCollectionMutationResult,
  RemoveCollectionMutationVariables,
} from '../../../generated/graphql'

export function useRemoveCollectionMutation() {
  return useMutation<
    RemoveCollectionMutationResult,
    RemoveCollectionMutationVariables
  >(RemoveCollectionDocument)
}
