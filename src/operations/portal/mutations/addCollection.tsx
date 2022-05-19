import { useMutation } from '@apollo/client'
import {
  AddCollectionDocument,
  AddCollectionMutationResult,
  AddCollectionMutationVariables,
} from 'generated/graphql'

export function useAddCollectionMutation() {
  return useMutation<
    AddCollectionMutationResult,
    AddCollectionMutationVariables
  >(AddCollectionDocument)
}
