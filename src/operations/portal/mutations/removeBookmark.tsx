import { useMutation } from '@apollo/client'
import type {
  RemoveBookmarkMutationResult,
  RemoveBookmarkMutationVariables,
} from 'types'
import { RemoveBookmarkDocument } from 'types'

export function useRemoveBookmarkMutation() {
  return useMutation<
    RemoveBookmarkMutationResult,
    RemoveBookmarkMutationVariables
  >(RemoveBookmarkDocument)
}
