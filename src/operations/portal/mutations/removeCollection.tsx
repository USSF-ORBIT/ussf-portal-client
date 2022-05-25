import { useMutation } from '@apollo/client'
import type {
  RemoveCollectionMutationResult,
  RemoveCollectionMutationVariables,
} from 'types'
import { RemoveCollectionDocument } from 'types'

export function useRemoveCollectionMutation() {
  return useMutation<
    RemoveCollectionMutationResult,
    RemoveCollectionMutationVariables
  >(RemoveCollectionDocument)
}
