import { useMutation } from '@apollo/client'
import type { EditCollectionMutationVariables } from 'types'
import { EditCollectionDocument } from 'types'

export function useEditCollectionMutation() {
  return useMutation<
    { editCollection: EditCollectionMutationVariables },
    EditCollectionMutationVariables
  >(EditCollectionDocument)
}
