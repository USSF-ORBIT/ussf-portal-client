import { useMutation } from '@apollo/client'
import type {
  RemoveBookmarkMutationResult,
  RemoveBookmarkMutationVariables,
} from 'types'
import { RemoveBookmarkDocument } from 'types/index'

export function useRemoveBookmarkMutation() {
  return useMutation<
    RemoveBookmarkMutationResult,
    RemoveBookmarkMutationVariables
  >(RemoveBookmarkDocument)
}
