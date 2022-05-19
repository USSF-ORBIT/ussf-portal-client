import { useMutation } from '@apollo/client'
import {
  EditBookmarkDocument,
  EditBookmarkMutationResult,
  EditBookmarkMutationVariables,
} from 'generated/graphql'

export function useEditBookmarkMutation() {
  return useMutation<EditBookmarkMutationResult, EditBookmarkMutationVariables>(
    EditBookmarkDocument
  )
}
