import { useMutation } from '@apollo/client'
import type {
  AddBookmarkMutationResult,
  AddBookmarkMutationVariables,
} from 'types'
import { AddBookmarkDocument } from 'types'

export function useAddBookmarkMutation() {
  return useMutation<AddBookmarkMutationResult, AddBookmarkMutationVariables>(
    AddBookmarkDocument
  )
}
