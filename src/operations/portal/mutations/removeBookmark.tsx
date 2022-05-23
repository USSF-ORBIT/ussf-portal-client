import { useMutation } from '@apollo/client'
import {
  RemoveBookmarkDocument,
  RemoveBookmarkMutationResult,
  RemoveBookmarkMutationVariables,
} from '../../../../generated/graphql'

export function useRemoveBookmarkMutation() {
  return useMutation<
    RemoveBookmarkMutationResult,
    RemoveBookmarkMutationVariables
  >(RemoveBookmarkDocument)
}
