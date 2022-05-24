import { useMutation } from '@apollo/client'
import {
  RemoveCollectionDocument,
  RemoveCollectionMutationResult,
  RemoveCollectionMutationVariables,
} from 'types/index'

export function useRemoveCollectionMutation() {
  return useMutation<
    RemoveCollectionMutationResult,
    RemoveCollectionMutationVariables
  >(RemoveCollectionDocument)
}
