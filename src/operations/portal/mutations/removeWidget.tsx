import { useMutation } from '@apollo/client'
import {
  RemoveWidgetDocument,
  RemoveWidgetMutationVariables,
  RemoveWidgetMutationResult,
} from '../../../../generated/graphql'

export function useRemoveWidgetMutation() {
  return useMutation<RemoveWidgetMutationResult, RemoveWidgetMutationVariables>(
    RemoveWidgetDocument
  )
}
