import { useMutation } from '@apollo/client'
import {
  EditBookmarkDocument,
  EditBookmarkMutationResult,
  EditBookmarkMutationVariables,
} from 'types/index'

export function useEditBookmarkMutation() {
  return useMutation<EditBookmarkMutationResult, EditBookmarkMutationVariables>(
    EditBookmarkDocument
  )
}
