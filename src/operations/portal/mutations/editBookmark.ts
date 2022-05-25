import { useMutation } from '@apollo/client'
import type {
  EditBookmarkMutationResult,
  EditBookmarkMutationVariables,
} from 'types'
import { EditBookmarkDocument } from 'types'

export function useEditBookmarkMutation() {
  return useMutation<EditBookmarkMutationResult, EditBookmarkMutationVariables>(
    EditBookmarkDocument
  )
}
