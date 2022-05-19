import { useMutation } from '@apollo/client'
import {
  EditCollectionDocument,
  EditCollectionMutationVariables,
} from '../../../generated/graphql'

export function useEditCollectionMutation() {
  // #TODO Review with Suz, result type not accepted
  return useMutation<
    { editCollection: EditCollectionMutationVariables },
    EditCollectionMutationVariables
  >(EditCollectionDocument)
}
