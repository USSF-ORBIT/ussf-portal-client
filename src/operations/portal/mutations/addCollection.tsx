import { useMutation } from '@apollo/client'
import type {
  AddCollectionMutationResult,
  AddCollectionMutationVariables,
} from 'types'
import { AddCollectionDocument } from 'types/index'

export function useAddCollectionMutation() {
  return useMutation<
    AddCollectionMutationResult,
    AddCollectionMutationVariables
  >(AddCollectionDocument)
}
