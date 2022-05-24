import { useMutation } from '@apollo/client'
import {
  AddCollectionDocument,
  AddCollectionMutationResult,
  AddCollectionMutationVariables,
} from 'types/index'

export function useAddCollectionMutation() {
  return useMutation<
    AddCollectionMutationResult,
    AddCollectionMutationVariables
  >(AddCollectionDocument)
}
