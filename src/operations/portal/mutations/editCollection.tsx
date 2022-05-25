import { useMutation } from '@apollo/client'
import type { EditCollectionMutationVariables } from 'types'
import { EditCollectionDocument } from 'types/index'

export function useEditCollectionMutation() {
  return useMutation<
    { editCollection: EditCollectionMutationVariables },
    EditCollectionMutationVariables
  >(EditCollectionDocument)
}
