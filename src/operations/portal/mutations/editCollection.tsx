import { useMutation } from '@apollo/client'
import {
  EditCollectionDocument,
  EditCollectionMutationVariables,
} from 'types/index'

export function useEditCollectionMutation() {
  return useMutation<
    { editCollection: EditCollectionMutationVariables },
    EditCollectionMutationVariables
  >(EditCollectionDocument)
}
