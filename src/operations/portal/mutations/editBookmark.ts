import { useMutation } from '@apollo/client'
import type {
  EditBookmarkMutationResult,
  EditBookmarkMutationVariables,
} from 'types'
import { EditBookmarkDocument } from 'types/index'

export function useEditBookmarkMutation() {
  return useMutation<EditBookmarkMutationResult, EditBookmarkMutationVariables>(
    EditBookmarkDocument
  )
}
