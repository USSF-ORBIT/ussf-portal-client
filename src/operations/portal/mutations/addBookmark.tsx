import { useMutation } from '@apollo/client'
import {
  AddBookmarkDocument,
  AddBookmarkMutationResult,
  AddBookmarkMutationVariables,
} from 'types/index'

export function useAddBookmarkMutation() {
  return useMutation<AddBookmarkMutationResult, AddBookmarkMutationVariables>(
    AddBookmarkDocument
  )
}
