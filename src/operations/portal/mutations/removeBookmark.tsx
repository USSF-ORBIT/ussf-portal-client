import { useMutation } from '@apollo/client'
import {
  RemoveBookmarkDocument,
  RemoveBookmarkMutationResult,
  RemoveBookmarkMutationVariables,
} from 'types/index'

export function useRemoveBookmarkMutation() {
  return useMutation<
    RemoveBookmarkMutationResult,
    RemoveBookmarkMutationVariables
  >(RemoveBookmarkDocument)
}
