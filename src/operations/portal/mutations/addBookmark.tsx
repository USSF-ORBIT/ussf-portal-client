import { useMutation } from '@apollo/client'

import {
  AddBookmarkDocument,
  AddBookmarkMutationResult,
  AddBookmarkMutationVariables,
} from 'generated/graphql'

export function useAddBookmarkMutation() {
  return useMutation<AddBookmarkMutationResult, AddBookmarkMutationVariables>(
    AddBookmarkDocument
  )
}
